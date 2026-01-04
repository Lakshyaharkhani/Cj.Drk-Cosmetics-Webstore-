
import { Product, User, Order, Customer } from './types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'citrus-soap',
        name: 'Citrus & Sage Cold Pressed Soap',
        price: 12.00,
        originalPrice: 15.00,
        category: 'soaps',
        description: 'A revitalizing blend of zesty citrus and earthy sage. This cold-pressed bar is rich in organic shea butter, providing a creamy lather.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsBGQYQDsqcswIiuxMQYW9-lyo0uQS3z912djiVkkHZwsTZCnsHHRa7zH_ycThBhyjtNlzXIO9LR8ysyZOZazwFBe4wjrOwwYx7IiopfSQs5ICeWh11316BpgAGE1v9A4wmeLL5KkxdDx8NIP_aQPyngRy5FBcrAGxcllOIj9DbDy_gE0G5BhHwHyoPiFDmTiqkH77RlR_dYjo1HlsvRFtTomTbaZe9wCCkWv9F-75LkJK5taFG2kZJ0djEouQ3xQuHCGC-bLoqCQ',
        thumbnails: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gF8kFb4H4z0BzGc3QOPvL3b1nPqm_tzLG4_uhN0Xc07SXQElXfoH9l-V6aGaLd-x5DhlTSDQ8c13_kYfSnUPWYPdKdCgJg_Ic_3KRoQg_TX2zt7opKMNSIZPt38t1qOVt8f02b3E0MdlLTYcTWby4wdfJQ3oBoUHIueAm3WBvj1joN9bEVaKeypvk35CQjVTnQ-o1K5FVKmxDnxpxRZ3xRMQWaqOgGI352bmxVoA5kGsZJcy-u3QB77sh55bDPjG31aRqreDIwM',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB_EQ9fz9qB-1fwhTKDVonMjuqfw77zLRxVH4wn-8jhllfLntfzBkkOVaVLKcDbdJouFz-xKeR7l6W0Jlex1sbT1SkRQS-x2Tnp_AVyrO6v6CrAmSLXn_8pNCDK-zNvSWzvxU12NSKUvDfDeQR-H2Mn3XSvJNvdv9UyA3WFKXUElvVy-nDhw9Q_1IGk3QznK4A0uye6pB-lxAZFtLaTR8KYs6394tGfOZIoJliOChWfiJWRwAotAT-wvQmEw4y8BCVaAUIAE2usJNs'
        ],
        rating: 4.8,
        reviews: 124,
        isBestSeller: true,
        ingredients: 'Saponified Oils of Olive, Coconut, Shea Butter, Castor, Sweet Almond, Essential Oils of Bergamot, Sage, and Cedarwood.',
        scentNotes: { top: 'Bergamot', middle: 'White Sage', base: 'Cedarwood' }
    },
    {
        id: 'lavender-oat',
        name: 'Lavender & Oat Milk Soap',
        price: 12.00,
        category: 'soaps',
        description: 'Calming lavender paired with soothing oat milk for the most sensitive skin.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqFvgHMaNitz_CoMPt47qFThSGwFvGKyc0BqIjFQxZsj_C9DlW8AqyevWfP5YZQtZLqgsHWT7GpaIeqwymqlM1cdiQKSXrHrk2EWwROePEnj2haXqh2suS3lGnqy3nC1-csYyfuhwKAQPa-5zkxdHk4n88_LExOUEP-J_UQOjS2gywkC5JO3kiVh1rMNT3KMfISZgT7OcNwUMlb1zwPZJrO6NG7qTuwOJmfjYBOuNxbvZ8qyzLbaayJrklje6hMUpef-px-irKrcI',
        thumbnails: [],
        rating: 4.9,
        reviews: 210,
    },
    {
        id: 'charcoal-detox',
        name: 'Charcoal Detox Bar',
        price: 14.00,
        category: 'soaps',
        description: 'Deep cleansing charcoal to draw out impurities and balance oily skin.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwi0pBfUehKWtPHfYEHL3-yMLt21CjYYNg7s5X3vyUfg5pjoyCEXPDxC_pwxCDTOicfLYj_7QAhwPqnZ6ZsUATVhHLIowmpjNCObktEyJ6T7-ACRZd8UAfr50drJHb40By3WFZXPeHdYbbh8_OJuQlCWN6J8DzIiRoRuPRSgsSQK5_fFQ8ZSGKCg7K39ptxTpMCuwa3IDUPU2d8yXrTSn_VIZagNH-kts9KkW1I6zjXRp24lECYuja42Z-ZEot1cUVUwj3LNlLgJ0',
        thumbnails: [],
        rating: 4.6,
        reviews: 95,
    },
    {
        id: 'amber-oakmoss',
        name: 'Amber & Oakmoss Solid Perfume',
        price: 24.00,
        category: 'perfumes',
        description: 'An earthy, rich scent that lingers. Hand-poured with natural beeswax.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBmoPelw1EZOKWnVfo9Bg5R8zAxxiuE-EVCchWsyf-00bNz1yWBxdDFdUwtAxySdVyY94CZuqeFjKSHuP3FLI6sxUJOlTWyu_txaupefKAiPwW0u4Nl8OcAesPaAVCOIip7ppf3qlTm_TPHD7zDtNsn0r260b1ZV7cjoZPaANwLMUb2V2zdmYLhKJ3DcBev8zcnSfF3A51fqgwPK6Qhl5haeT_4X-tMtFlhsva0PwmdxFkmkiaoEfarv1CTFU-hnNb_kPgbGUaUk4',
        thumbnails: [],
        rating: 4.7,
        reviews: 42,
    },
    {
        id: 'radiance-serum',
        name: 'Radiance Face Serum',
        price: 34.00,
        category: 'serums',
        description: 'Concentrated botanicals to brighten and rejuvenate your complexion.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8v-PKmj_nXYqdAJuZRqW2CJu3CZmz709ellW-XW-zNiiB_9ShN2FNiwGyI3rz02Uet6S1ZKNkRb2eSZSJ6z5TAW8JSaUKetrNk7qpbcFq7tucgoLewz7_eby5U_qhavgGIltMNEdie6tBsOC2llidK_kZlrCtUTNG7rD7tkhNIq_BrkHovKdVc_yKp9b2U0EPQBW6r5BbP0cM-iWBh9BsTHDptirIbNYnCkHLuRHfRKQVocAgF7QnS_riWqxJBmKFO9mEveh8Bjk',
        thumbnails: [],
        rating: 5.0,
        reviews: 84,
    }
];

export const MOCK_USER: User = {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    points: 450,
    orderCount: 12,
    memberStatus: 'Active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpvmpOWaspffgLYBqdyIUb5AZLGvSwxuZzqiNyE_ZP8ggKt3XRpUfqsCenZoVFMsgnjtapTPJAuuDxjeUr7L4Qyn_YgfQnOycWUYuXEwhcrgp9X6GwBzhSwOKdSNYehBfPyFvo1ykkDdQF_nBq3Mh-GJt50n7ZGeTciSfWwbuBg6iZcCQRvHNYZc258-fssW4bc41l3qrarSrglYAleBTbtKMPzYnXrjd6Xyd3fABI9rxsv3Z9RYTggoB_2aWVcJM3S7t-YnM1qGI'
};

export const MOCK_ORDERS: Order[] = [
    { id: '#ORD-2094', customer: 'Sarah M.', customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gF8kFb4H4z0BzGc3QOPvL3b1nPqm_tzLG4_uhN0Xc07SXQElXfoH9l-V6aGaLd-x5DhlTSDQ8c13_kYfSnUPWYPdKdCgJg_Ic_3KRoQg_TX2zt7opKMNSIZPt38t1qOVt8f02b3E0MdlLTYcTWby4wdfJQ3oBoUHIueAm3WBvj1joN9bEVaKeypvk35CQjVTnQ-o1K5FVKmxDnxpxRZ3xRMQWaqOgGI352bmxVoA5kGsZJcy-u3QB77sh55bDPjG31aRqreDIwM', productName: 'Citrus & Sage Soap', productImage: MOCK_PRODUCTS[0].image, date: 'Oct 24, 2024', status: 'Pending', amount: 12.00 },
    { id: '#ORD-2093', customer: 'James L.', customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcsrsZDOdOVxbVDH13VM9V7Pt6JF_QvCXPIgCSXYXFRY0P2cWQ4X8ClrCYffzOKRNn7h-sqEmGcXiGuqOMQZOaO3uEarpKXk1mab0WjAirWFZDpZHnKsuBsWp546EwZOzmokcctOgxv0Zhr0XPlne3emBAmu5wfViizvpxBxcwqAdO1YNcVwSUziVr9sVao7UgN9O2SAY7NLU4J_ayv0A-9icsywQkzd_RpuammYTZTjh9SMMZJkgImw5wSdjwt35umhgARp3RUJE', productName: 'Radiance Face Serum', productImage: MOCK_PRODUCTS[4].image, date: 'Oct 23, 2024', status: 'Shipped', amount: 34.00 },
    { id: '#ORD-2092', customer: 'Emily R.', customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaKIO_rfDru-AkueN6A2AFp0NHTRsjnfNUJtwb5fGdCU8OU7OWNbUupI-arcQAz_beBnq02N3-ObLavoTGP-BvwjbRALFRqI6KBpT92dvRAmSw1b_ylm2CHzI91pLRDPNIMZn5w8ZYo0xuVab2IqLkxfjnZPUEPuBSldx4pShGA69wzDZHDIaFf6VPAbAIB1i82bG-mzxqQTShJdVf4GjtvmRrgfpMid_fzu6bl65rZXaY1nOR9VEeza4Llm3jW852yvZa6BmKtXY', productName: 'Amber & Oakmoss', productImage: MOCK_PRODUCTS[3].image, date: 'Oct 23, 2024', status: 'Delivered', amount: 24.00 },
    { id: '#ORD-2091', customer: 'Michael B.', customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWA--V0YGteEO7dDRvl8R-OhoxZ82WA_68pRX1lkZjP2dC1T2_epZhjg5IoUl8dhf9bB1n6IacS4DvNpuh8QsrBpUmEeSzscRRvaxm9uYWD9iks0a5xr0Oo3FPN-1-gIuyJrdiCbGDEwWrvrPuxufrOlTxxwxAw2zy1PnLrpk3_xlXZdooZ6IHYHaTQ1QMYTLYXOAHgpaiI-SfjBwxY1eutQqcLz6hdn9z2Jc0msETIVoyOzIzpA-LrHEIIwE9J_m-fWMD2YUjV6Y', productName: 'Lavender Soap', productImage: MOCK_PRODUCTS[1].image, date: 'Oct 22, 2024', status: 'Processing', amount: 12.00 },
    { id: '#ORD-2090', customer: 'Jessica T.', customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_EQ9fz9qB-1fwhTKDVonMjuqfw77zLRxVH4wn-8jhllfLntfzBkkOVaVLKcDbdJouFz-xKeR7l6W0Jlex1sbT1SkRQS-x2Tnp_AVyrO6v6CrAmSLXn_8pNCDK-zNvSWzvxU12NSKUvDfDeQR-H2Mn3XSvJNvdv9UyA3WFKXUElvVy-nDhw9Q_1IGk3QznK4A0uye6pB-lxAZFtLaTR8KYs6394tGfOZIoJliOChWfiJWRwAotAT-wvQmEw4y8BCVaAUIAE2usJNs', productName: 'Charcoal Detox', productImage: MOCK_PRODUCTS[2].image, date: 'Oct 21, 2024', status: 'Delivered', amount: 14.00 },
];

export const MOCK_CUSTOMERS: Customer[] = [
    { id: '1', name: 'Sarah M.', email: 'sarah.m@example.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gF8kFb4H4z0BzGc3QOPvL3b1nPqm_tzLG4_uhN0Xc07SXQElXfoH9l-V6aGaLd-x5DhlTSDQ8c13_kYfSnUPWYPdKdCgJg_Ic_3KRoQg_TX2zt7opKMNSIZPt38t1qOVt8f02b3E0MdlLTYcTWby4wdfJQ3oBoUHIueAm3WBvj1joN9bEVaKeypvk35CQjVTnQ-o1K5FVKmxDnxpxRZ3xRMQWaqOgGI352bmxVoA5kGsZJcy-u3QB77sh55bDPjG31aRqreDIwM', totalOrders: 12, totalSpent: 450.00, lastActive: '2 hours ago' },
    { id: '2', name: 'James L.', email: 'james.l@example.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcsrsZDOdOVxbVDH13VM9V7Pt6JF_QvCXPIgCSXYXFRY0P2cWQ4X8ClrCYffzOKRNn7h-sqEmGcXiGuqOMQZOaO3uEarpKXk1mab0WjAirWFZDpZHnKsuBsWp546EwZOzmokcctOgxv0Zhr0XPlne3emBAmu5wfViizvpxBxcwqAdO1YNcVwSUziVr9sVao7UgN9O2SAY7NLU4J_ayv0A-9icsywQkzd_RpuammYTZTjh9SMMZJkgImw5wSdjwt35umhgARp3RUJE', totalOrders: 5, totalSpent: 185.50, lastActive: '1 day ago' },
    { id: '3', name: 'Emily R.', email: 'emily.r@example.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaKIO_rfDru-AkueN6A2AFp0NHTRsjnfNUJtwb5fGdCU8OU7OWNbUupI-arcQAz_beBnq02N3-ObLavoTGP-BvwjbRALFRqI6KBpT92dvRAmSw1b_ylm2CHzI91pLRDPNIMZn5w8ZYo0xuVab2IqLkxfjnZPUEPuBSldx4pShGA69wzDZHDIaFf6VPAbAIB1i82bG-mzxqQTShJdVf4GjtvmRrgfpMid_fzu6bl65rZXaY1nOR9VEeza4Llm3jW852yvZa6BmKtXY', totalOrders: 8, totalSpent: 320.00, lastActive: '3 days ago' },
];

    