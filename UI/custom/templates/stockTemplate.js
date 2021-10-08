import customTemplate from '../customTemplate'

function stockTemplate(){

}
stockTemplate.prototype.renderMessage=function(){
    return "<h1>a</h1>"
}

new customTemplate.install(new stockTemplate());

export default new stockTemplate;