import customTemplate from '../templateManager'

function stockTemplate(){

}
stockTemplate.prototype.renderMessage=function(){
    return "<h1>a</h1>"
}


export default stockTemplate;



class customStockTemplate{
    renderMessage(msgData){
        return '<h2>Stock Template</h2>'
    }
}
