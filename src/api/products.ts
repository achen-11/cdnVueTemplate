// API 路由定义
// @k-url /api/products/{action}

// 获取产品列表
k.api.get('/list', () => {
    const products = [
        { id: '1', name: 'Product 1', price: 99.99 },
        { id: '2', name: 'Product 2', price: 149.99 },
        { id: '3', name: 'Product 3', price: 79.99 }
    ]
    return { success: true, data: { items: products, total: 3 } }
})

// 搜索产品
k.api.get('/search', () => {
    const { keyword } = k.request.queryString

    // 模拟搜索
    const products = [
        { id: '1', name: 'Search Result 1', price: 99.99 },
        { id: '2', name: 'Search Result 2', price: 149.99 }
    ]

    return { success: true, data: { items: products, total: 2 } }
})

// 获取产品详情
k.api.get('/detail', () => {
    const { id } = k.request.queryString

    if (!id) {
        return k.api.httpCode(400)
    }

    const product = {
        id: id,
        name: 'Product ' + id,
        price: 99.99,
        description: 'Product description'
    }

    return { success: true, data: product }
})

// 添加到购物车
k.api.post('/add', (body) => {
    const { productId, quantity } = body

    if (!productId) {
        return { success: false, error: 'Product ID is required' }
    }

    // 获取或创建购物车
    const cart = k.commerce.cart.get()
    cart.addItem(productId, quantity || 1)

    return { success: true, message: 'Added to cart' }
})

// 获取购物车内容
k.api.get('/cart/list', () => {
    const cart = k.commerce.cart.get()

    return { success: true, data: cart.items }
})

// 获取购物车数量
k.api.get('/cart/count', () => {
    const cart = k.commerce.cart.get()
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return { success: true, data: { count } }
})

export {}
