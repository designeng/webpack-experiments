$plugins: [
    'essential-wire/source/debug',
    './plugins/express/application',
    './plugins/express/routing'
]
app:
    expressApplication: true
    
    routeMiddleware:
        routes: [
            {   
                url: '/article',
                component: {$ref: 'articleContainer'},
                title: 'Isomorphic article page'
            }
        ]

    staticMiddleware:
        dir: './public'

    routeNotFoundMiddleware: {}
        
    server:
        port    : process.env.PORT || 3000
        verbose : true