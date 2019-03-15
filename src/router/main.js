const Home = () => import('../components/HelloWorld');
const GoogleMap = () => import('../components/GoogleMap');
const CodeIde = () => import('../components/CodeIde');


export default [
  { path: '/', component: Home, meta: { title: '主页' } },
  {
    path: '/googleMap',
    name: 'googleMap',
    meta: { title: '谷歌地图' },
    component: GoogleMap,
  },
  {
    path: '/codeIde',
    name: 'codeIde',
    meta: { title: 'ide编辑器' },
    component: CodeIde,
  },
];
