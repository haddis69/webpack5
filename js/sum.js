export default function sum(...argu){
    return argu.reduce((p,c)=>{
        return p+c;
    },0)
}