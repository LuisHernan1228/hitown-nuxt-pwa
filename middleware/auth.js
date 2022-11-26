export default function ({ route, redirect }) {
  if(route.fullPath === '/')
    redirect('/home');
  // else if(route.fullPath.includes('coupon-category') && !store.state.auth.authStatus) {
  //   // localStorage.setItem('latestRoute', route.fullPath);
  //   redirect('/auth/login');
  // }
}
