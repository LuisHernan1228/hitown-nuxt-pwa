export default function ({ store, route, redirect }) {
  localStorage.setItem('latestRoute', route.fullPath);
  if(!store.state.auth.authStatus)
    redirect('/auth/login');
}