export default [{
	path: '/',
	name: 'home',
	component: () => import('@/views/Home'),
	meta: {
		requiresAuth: true,
		includeInNavbar: false,
		title: 'Sign Up',
	}
}, {
	path: '/login',
	name: 'login',
	component: () => import('@/views/Login'),
	meta: {
		guest: true,
		includeInNavbar: false,
		title: 'Sign In',
		layout: 'empty'
	}
}, {
	path: '*',
	name: 'PageNotFound',
	component: () => import('@/views/PageNotFound'),
	meta: {
		includeInNavbar: false,
	}
}]