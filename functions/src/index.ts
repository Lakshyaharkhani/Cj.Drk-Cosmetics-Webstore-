import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

/**
 * Creates a new order, generates a sequential order ID, saves it to Firestore,
 * and prepares an email for the Trigger Email extension.
 */
export const placeOrder = functions.https.onCall(async (data, context) => {
  // 1. Authentication & Basic Validation
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { cartItems, totalAmount, shippingAddress, cartId } = data;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Cart must contain at least one item."
    );
  }

  // 2. Generate Sequential Order ID
  const counterRef = db.doc("counters/orderStats");
  let newOrderId: string;

  try {
    const newCount = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists) {
        // If the counter doesn't exist, we start it.
        // The user should pre-create this for the first order.
        transaction.set(counterRef, { lastCount: 1001 });
        return 1001;
      }

      const newCount = (counterDoc.data()?.lastCount || 0) + 1;
      transaction.update(counterRef, { lastCount: newCount });
      return newCount;
    });

    newOrderId = `CJ-${newCount}`;
  } catch (error) {
    console.error("Transaction to generate Order ID failed:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Could not generate a new order ID."
    );
  }

  // 3. Prepare and Save the Order Document
  const orderData = {
    orderId: newOrderId,
    userId: context.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: "pending",
    items: cartItems,
    totalAmount: totalAmount,
    shippingAddress: shippingAddress,
    // 4. Prepare email payload for "Trigger Email" extension
    emailDelivery: {
      to: context.auth.token.email,
      message: {
        subject: `Your Cj.Drk Order Confirmation #${newOrderId}`,
        html: `
          <h1>Thank you for your order!</h1>
          <p>Hi ${shippingAddress.fullName},</p>
          <p>We've received your order #${newOrderId} and are getting it ready.</p>
          <h2>Order Summary:</h2>
          <ul>
            ${cartItems
              .map(
                (item: any) =>
                  `<li>${item.name} (x${item.quantity}) - Rs ${item.price.toFixed(
                    2
                  )}</li>`
              )
              .join("")}
          </ul>
          <h3>Total: Rs ${totalAmount.toFixed(2)}</h3>
          <p>Thank you for shopping with Cj.Drk!</p>
        `,
      },
    },
  };

  const orderRef = db.collection("orders").doc(newOrderId);

  try {
    await orderRef.set(orderData);
  } catch (error) {
    console.error("Failed to save new order:", error);
    throw new functions.https.HttpsError(
      "internal",
      "There was a problem saving your order."
    );
  }

  // 5. Cleanup Cart
  if (cartId && typeof cartId === 'string') {
    const cartRef = db.collection("carts").doc(cartId);
    try {
        // We don't await this so it doesn't block the function return
        cartRef.delete().catch(err => console.error(`Failed to delete cart ${cartId}`, err));
    } catch (error) {
        // Log error but don't fail the order process
        console.error(`Error initiating deletion for cart ${cartId}`, error);
    }
  }


  return {
    success: true,
    orderId: newOrderId,
    message: "Order placed successfully.",
  };
});
