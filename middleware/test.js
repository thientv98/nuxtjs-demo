export default function({ store, redirect }){
  if(!store.getters['test/middleware']){
    return redirect('/dashboard')
  }
}
