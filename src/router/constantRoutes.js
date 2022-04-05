import Layout from '@/layout'

export default [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/penson',
        redirect: '/pensons',
        component: Layout,
        hidden: true,
        children: [{
            path: '/pensons',
            name: 'Pensons',
            component: () =>
                import ('@/views/penson/index'),
            meta: {
                title: '个人中心',
                icon: 'el-icon-user'
            }
        }, ],
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: 'HOME',
        meta: {
            title: '首页',
            icon: 'el-icon-s-home'
        },
        children: [{
                path: '/home',
                name: 'Home',
                component: () =>
                    import ('@/views/home/index'),
                meta: {
                    title: '欢迎',
                    icon: 'el-icon-loading'
                }
            },
            {
                path: 'homeDetile',
                name: 'HomeDetile',
                component: () =>
                    import ('@/views/home/homeDetile'),
                meta: {
                    title: '首页标语',
                    icon: 'el-icon-s-operation'
                }
            }
        ]
    },

    {
        path: '/article',
        component: Layout,
        redirect: '/article/list',
        name: 'Article',
        meta: {
            title: '文章',
            icon: 'el-icon-tickets'
        },
        children: [{
                path: 'list',
                name: 'ArticleList',
                component: () =>
                    import ('@/views/article/list/list'),
                meta: {
                    title: '文章列表',
                    icon: 'el-icon-document-copy'
                }
            },
            {
                path: 'group',
                name: 'ArticleGroup',
                component: () =>
                    import ('@/views/article/group/group'),
                meta: {
                    title: '文章分类',
                    icon: 'tree'
                }
            },
            {
                path: 'add',
                name: 'ArticleAdd',
                component: () =>
                    import ('@/views/article/add/add'),
                meta: {
                    title: '添加文章',
                    icon: 'el-icon-edit-outline'
                }
            },
            {
                path: 'edit',
                hidden: true,
                name: 'ArticleEdit',
                component: () =>
                    import ('@/views/article/add/edit'),
                meta: {
                    title: '编辑文章',
                }
            }
        ]
    },
    {
        path: '/project',
        component: Layout,
        redirect: '/project/list',
        name: 'Project',
        meta: {
            title: '项目管理',
            icon: 'el-icon-menu'
        },
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/project/list/list'),
            name: 'List',
            meta: {
                title: '项目列表',
                icon: 'el-icon-s-order'
            }
        }, {
            path: 'add',
            component: () =>
                import ('@/views/project/add/add'),
            name: 'Add',
            meta: {
                title: '添加项目',
                icon: 'el-icon-copy-document'
            }
        }]
    },

    {
        path: '/comment',
        component: Layout,
        children: [{
            path: 'tube',
            component: () =>
                import ('@/views/comment/tube/tube'),
            name: 'Tube',
            meta: {
                title: '评论管理',
                icon: 'el-icon-film'
            }
        }]
    },
    {
        path: '/message',
        component: Layout,
        children: [{
            path: 'message',
            component: () =>
                import ('@/views/message/message'),
            name: 'Message',
            meta: {
                title: '留言板',
                icon: 'el-icon-chat-dot-square'
            }
        }]
    },
    {
        path: '/about',
        component: Layout,
        children: [{
            path: 'about',
            component: () =>
                import ('@/views/about/about'),
            name: 'About',
            meta: {
                title: '关于我',
                icon: 'el-icon-s-check'
            }
        }]
    },
    {
        path: '/setting',
        component: Layout,
        children: [{
            path: 'setting',
            component: () =>
                import ('@/views/setting'),
            name: 'Setting',
            meta: {
                title: '设置',
                icon: 'el-icon-setting'
            }
        }]
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]