// 靜態商品目錄：純前端 demo 用的商品/分類資料。

export type Category = {
  id: string
  slug: string
  name: string
  description: string | null
  cover_image_url: string | null
  sort_order: number
}

export type ProductImage = {
  id: string
  url: string
  alt_text: string | null
  sort_order: number
}

export type ProductVariant = {
  id: string
  sku: string
  size: string | null
  color: string | null
  price_override: number | null
  stock_quantity: number
}

export type Product = {
  id: string
  slug: string
  category_id: string | null
  name: string
  description: string | null
  base_price: number
  currency: string
  status: 'draft' | 'active' | 'archived'
  cover_image_url: string | null
  product_images: ProductImage[]
  product_variants: ProductVariant[]
}

export const categories: Category[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'dresses',
    name: '洋裝',
    description: '日常與正式場合皆宜的洋裝系列',
    cover_image_url:
      'https://images.unsplash.com/photo-1777466140335-7165dbd9c871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    sort_order: 1
  },
  {
    id: '11111111-1111-1111-1111-111111111112',
    slug: 'outerwear',
    name: '外套',
    description: '四季皆宜的針織與梭織外套',
    cover_image_url:
      'https://images.unsplash.com/photo-1643015862949-5c8d15a4242e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    sort_order: 2
  },
  {
    id: '11111111-1111-1111-1111-111111111113',
    slug: 'accessories',
    name: '配件',
    description: '包款、飾品與其他配件',
    cover_image_url:
      'https://plus.unsplash.com/premium_photo-1740020266751-138ca2429cca?q=80&w=800',
    sort_order: 3
  },
  {
    id: '11111111-1111-1111-1111-111111111114',
    slug: 'tops',
    name: '上衣',
    description: '針織、雪紡與棉麻材質的日常上衣',
    cover_image_url: 'https://images.unsplash.com/photo-1583914143620-46298183773a?q=80&w=800',
    sort_order: 4
  }
]

export const products: Product[] = [
  {
    id: '22222222-2222-2222-2222-222222222221',
    slug: 'linen-wrap-dress',
    category_id: '11111111-1111-1111-1111-111111111111',
    name: '砂洗空氣棉繞頸附Bra長洋',
    description: '親膚滑順空氣感材質。',
    base_price: 2480,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/c5abddb9-8c19-4a55-9bb4-760acef45cc2.jpg',
    product_images: [
      {
        id: 'img-linen-wrap-dress-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/c5abddb9-8c19-4a55-9bb4-760acef45cc2.jpg',
        alt_text: '砂洗空氣棉繞頸附Bra長洋',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-lwd-s-beige',
        sku: 'LWD-S-BEIGE',
        size: 'S',
        color: '咖',
        price_override: null,
        stock_quantity: 12
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'wool-blend-coat',
    category_id: '11111111-1111-1111-1111-111111111112',
    name: '涼感針織排釦外罩',
    description: '圓領排釦設計。',
    base_price: 4980,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/d59c3d46-bb34-4a2d-b012-6adeab625687.jpg',
    product_images: [
      {
        id: 'img-wool-blend-coat-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/d59c3d46-bb34-4a2d-b012-6adeab625687.jpg',
        alt_text: '涼感針織排釦外罩',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-wbc-m-camel',
        sku: 'WBC-M-CAMEL',
        size: 'M',
        color: '粉',
        price_override: null,
        stock_quantity: 6
      },
      {
        id: 'var-wbc-l-camel',
        sku: 'WBC-L-CAMEL',
        size: 'L',
        color: '白',
        price_override: null,
        stock_quantity: 3
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222223',
    slug: 'canvas-tote-bag',
    category_id: '11111111-1111-1111-1111-111111111113',
    name: '簡約球型耳環',
    description: '耳針/側邊logo雷雕。',
    base_price: 1280,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/e9d19d81-131b-4f0b-9c49-b2a61b3015d0.jpg',
    product_images: [
      {
        id: 'img-canvas-tote-bag-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/e9d19d81-131b-4f0b-9c49-b2a61b3015d0.jpg',
        alt_text: '簡約球型耳環',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-ctb-one-natural',
        sku: 'CTB-ONE-NATURAL',
        size: 'ONE',
        color: '金',
        price_override: null,
        stock_quantity: 20
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222224',
    slug: 'silk-drape-blouse',
    category_id: '11111111-1111-1111-1111-111111111114',
    name: 'UPF50+日常輕薄防曬襯衫',
    description: '全面抗UV UPF50+｜輕透涼感｜輕透防護好攜帶。',
    base_price: 3280,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/f7f1d0fe-12b5-46cf-af10-c14da2ffb70b.jpg',
    product_images: [
      {
        id: 'img-silk-drape-blouse-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/f7f1d0fe-12b5-46cf-af10-c14da2ffb70b.jpg',
        alt_text: 'UPF50+日常輕薄防曬襯衫',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-sdb-s-ivory',
        sku: 'SDB-S-IVORY',
        size: 'S',
        color: '白',
        price_override: null,
        stock_quantity: 8
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222225',
    slug: 'cashmere-knit-top',
    category_id: '11111111-1111-1111-1111-111111111114',
    name: '小姐與流氓長袖TEE(Disney系列)',
    description: '寬鬆長袖版型/水洗設計/Disney系列/僅限台灣地區販售。',
    base_price: 4580,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/14251f74-760d-4130-a943-4d9e41c31c79.jpg',
    product_images: [
      {
        id: 'img-cashmere-knit-top-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/14251f74-760d-4130-a943-4d9e41c31c79.jpg',
        alt_text: '小姐與流氓長袖TEE(Disney系列)',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-ckt-s-oat',
        sku: 'CKT-S-OAT',
        size: 'S',
        color: '白',
        price_override: null,
        stock_quantity: 6
      },
      {
        id: 'var-ckt-m-oat',
        sku: 'CKT-M-OAT',
        size: 'M',
        color: '黑',
        price_override: null,
        stock_quantity: 9
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222226',
    slug: 'cotton-puff-sleeve-top',
    category_id: '11111111-1111-1111-1111-111111111114',
    name: '蕾絲拼接排釦背心',
    description: '棉質布料/衣身拼接鏤空蕾絲/排釦設計。',
    base_price: 1980,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/f77a55d5-86de-4677-a553-cc0efdcf757e.jpg',
    product_images: [
      {
        id: 'img-cotton-puff-sleeve-top-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/f77a55d5-86de-4677-a553-cc0efdcf757e.jpg',
        alt_text: '蕾絲拼接排釦背心',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-cpt-s-cream',
        sku: 'CPT-S-CREAM',
        size: 'S',
        color: '黑',
        price_override: null,
        stock_quantity: 12
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222227',
    slug: 'linen-handstitch-shirt',
    category_id: '11111111-1111-1111-1111-111111111114',
    name: '針織條紋排釦背心',
    description: '針織條紋設計/洞洞紋路設計/排釦設計。',
    base_price: 2280,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/4547e28c-6592-4a3e-bfc0-5e0e28f34002.jpg',
    product_images: [
      {
        id: 'img-linen-handstitch-shirt-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/4547e28c-6592-4a3e-bfc0-5e0e28f34002.jpg',
        alt_text: '針織條紋排釦背心',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-lhs-s-greyblue',
        sku: 'LHS-S-GREYBLUE',
        size: 'S',
        color: '白',
        price_override: null,
        stock_quantity: 9
      },
      {
        id: 'var-lhs-m-greyblue',
        sku: 'LHS-M-GREYBLUE',
        size: 'M',
        color: '黑',
        price_override: null,
        stock_quantity: 11
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222228',
    slug: 'handmade-lace-dress',
    category_id: '11111111-1111-1111-1111-111111111111',
    name: '慵懶平口層次長洋裝',
    description: '可調式肩帶/全長內裡。',
    base_price: 3880,
    currency: 'TWD',
    status: 'active',
    cover_image_url:
      'https://pics.mercci22.tw/mercci22/ProductBasics/606b2701-7489-43fa-b110-6671e29ce9e5.jpg',
    product_images: [
      {
        id: 'img-handmade-lace-dress-0',
        url: 'https://pics.mercci22.tw/mercci22/ProductBasics/606b2701-7489-43fa-b110-6671e29ce9e5.jpg',
        alt_text: '慵懶平口層次長洋裝',
        sort_order: 0
      }
    ],
    product_variants: [
      {
        id: 'var-hld-s-ivory',
        sku: 'HLD-S-IVORY',
        size: 'S',
        color: '白',
        price_override: null,
        stock_quantity: 5
      }
    ]
  }
]
