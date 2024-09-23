import helpers from '../../../../utils/helpers';
import './searchResults.scss';
export class searchResultsTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "search") {
            let messageHtml = $(me.getTemplateString('searchTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            $(messageHtml).data(msgData);
            me.bindEvents(messageHtml, msgData);
            return $(messageHtml);
        }
    }
    bindEvents(ele: any, msgData: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(ele).off('click', '.read-more-less').on('click', '.read-more-less', function (e: any) {
            if($(chatWindowInstance.chatEle).find('.read-more-less').hasClass('desc-read-more') ){
                $(chatWindowInstance.chatEle).find('.read-more-less.desc-read-more').addClass('hide');
                $(chatWindowInstance.chatEle).find('.read-more-less.desc-read-less').removeClass('hide');
                $(chatWindowInstance.chatEle).find('.temp-data-desc').css('-webkit-line-clamp','inherit');
                $(chatWindowInstance.chatEle).find('.read-more-less').removeClass('desc-read-more');
            } else {
                $(chatWindowInstance.chatEle).find('.read-more-less').removeClass('hide');
                $(chatWindowInstance.chatEle).find('.read-more-less.desc-read-less').addClass('hide');
                $(chatWindowInstance.chatEle).find('.temp-data-desc').css('-webkit-line-clamp','8');
                $(chatWindowInstance.chatEle).find('.read-more-less').addClass('desc-read-more');
            }
        });
        $(ele).off('click', '.show-more-results-block').on('click', '.show-more-results-block', function (e: any) {
            $(chatWindowInstance.chatEle).find('.show-more-results-block').addClass('hide');
            $(chatWindowInstance.chatEle).find('.search-data-container').removeClass('hide');
            $(chatWindowInstance.chatEle).find('.search-data').removeClass('hide');
        });

        $(ele).off('click', '.click-to-navigate-url').on('click', '.click-to-navigate-url', function (e: any) {
            let href = $(chatWindowInstance.chatEle).find('.click-to-navigate-url').attr('href');
            if (href.indexOf("http:") < 0 && href.indexOf("https:") < 0) {
                href = "http:////" + href;
            }
            chatWindowInstance.openExternalLink(href);
        });
    }

    getTemplateString() {
        let searchTemplate = '<script id="search_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData && msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId}" class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon" data-kr-msg-id="${msgData.messageId}"> \
                <div class="messageBubble"> \
                    <div class="search-temp-one"> \
                        {{each(key, msgItem) msgData.message[0].component.payload.graph_answer.payload.center_panel.data}} \
                            <div class="paragraph-temp-title">{{html helpers.convertMDtoHTML(msgItem.snippet_title, "bot")}}</div> \
                            <div class="temp-data-desc">{{html helpers.convertMDtoHTML(msgItem.snippet_content, "bot")}} \
                                <span class="read-more-less desc-read-more"> ...Read More</span> \
                                <span class="read-more-less desc-read-less hide">Show Less</span> \
                            </div> \
                            <div class="snippet-source-block"> \
                                <div class="snippet-source-file-name">{{html helpers.convertMDtoHTML(msgItem.source, "bot")}}</div> \
                                <a href="${msgItem.url}"> \
                                <div class="snippet-source-url ">\
                                    <span class="snippet-source-url-name">${msgItem.url}"</span>\
                                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwMl8yKSI+CjxwYXRoIGQ9Ik01LjY4MDY1IDExLjI1QzUuNDI2NzYgMTEuMjUgNS4yMjA5NSAxMS4wNDQyIDUuMjIwOTUgMTAuNzkwM0M1LjIyMDk1IDEwLjU1MDUgNS40MDQ1MyAxMC4zNTM2IDUuNjM4OCAxMC4zMzI1TDUuNjgwNjUgMTAuMzMwNkg5LjUxMjg5QzkuOTQ4MzggMTAuMzMwNiAxMC4zMDQ0IDkuOTkwMTkgMTAuMzI5MiA5LjU2MDk0TDEwLjMzMDYgOS41MTI4OVYyLjQ4NzExQzEwLjMzMDYgMi4wNTE2MiA5Ljk5MDE5IDEuNjk1NjUgOS41NjA5NCAxLjY3MDc3TDkuNTEyODkgMS42NjkzOUgyLjQ4NzExQzIuMDUxNjIgMS42NjkzOSAxLjY5NTY1IDIuMDA5ODEgMS42NzA3NyAyLjQzOTA2TDEuNjY5MzkgMi40ODcxMVY2LjMxOTM1QzEuNjY5MzkgNi41NzMyNCAxLjQ2MzU3IDYuNzc5MDUgMS4yMDk2OSA2Ljc3OTA1QzAuOTY5OTE2IDYuNzc5MDUgMC43NzMwMTYgNi41OTU0NyAwLjc1MTg3OCA2LjM2MTJMMC43NSA2LjMxOTM1VjIuNDg3MTFDMC43NSAxLjU0OTUzIDEuNDkyNzggMC43ODU0NDUgMi40MjE5OCAwLjc1MTE5OEwyLjQ4NzExIDAuNzVIOS41MTI4OUMxMC40NTA1IDAuNzUgMTEuMjE0NiAxLjQ5Mjc4IDExLjI0ODggMi40MjE5OEwxMS4yNSAyLjQ4NzExVjkuNTEyODlDMTEuMjUgMTAuNDUwNSAxMC41MDcyIDExLjIxNDYgOS41NzgwMiAxMS4yNDg4TDkuNTEyODkgMTEuMjVINS42ODA2NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03Ljc1MjU0IDMuOTAzNDdDNy45OTIzMSAzLjkwMzQ3IDguMTg5MjEgNC4wODcwNSA4LjIxMDM1IDQuMzIxMzNMOC4yMTIyMyA0LjM2MzE3VjYuOTE4QzguMjEyMjMgNy4xNzE4OCA4LjAwNjQyIDcuMzc3NjkgNy43NTI1NCA3LjM3NzY5QzcuNTEyNzYgNy4zNzc2OSA3LjMxNTg2IDcuMTk0MTEgNy4yOTQ3MiA2Ljk1OTg0TDcuMjkyODQgNi45MThMNy4yOTI2NiA1LjQ3ODRMMi44MzI4MyA5LjkzODIzQzIuNjUzMzEgMTAuMTE3OCAyLjM2MjI1IDEwLjExNzggMi4xODI3MyA5LjkzODIzQzIuMDEzNzcgOS43NjkyNyAyLjAwMzgzIDkuNTAxNTEgMi4xNTI5MSA5LjMyMDkyTDIuMTgyNzMgOS4yODgxM0w2LjY0ODE5IDQuODIyNjdMNS4xOTc3MSA0LjgyMjg2QzQuOTU3OTMgNC44MjI4NiA0Ljc2MTAzIDQuNjM5MjggNC43Mzk4OSA0LjQwNTAxTDQuNzM4MDEgNC4zNjMxN0M0LjczODAxIDQuMTIzMzkgNC45MjE1OSAzLjkyNjQ5IDUuMTU1ODcgMy45MDUzNUw1LjE5NzcxIDMuOTAzNDdINy43NTI1NFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTAyXzIiPgo8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" /> \
                                    </div>\
                                </a> \
                            </div> \
                        {{/each}} \
                    </div> \
                </div> \
                <div class="show-more-results-block"> \
                    <span>Show more results</span> \
                </div>\
                <div class="search-data-container hide"> \
                    <div class="title-list-heading">Web Pages</div> \
                </div> \
                <div class="search-data hide"> \
                    <div class="messageBubble"> \
                        <div class="finalResults"> \
                            <div class="parent-list-template"> \
                                {{each(key, msgItem) msgData.message[0].component.payload.results.web.data}} \
                                    <div class="content-info  click-to-navigate-url click-log-metrics" data-title="Mutual Fund Investment Plans | IDFC FIRST Bank" contentid="${msgItem.contentId}" contenttype="${msgItem,sys_content_type}" id="0" href="${msgItem.page_url}" target="_blank"> \
                                        <div class="img_block"> \
                                            <img src="${msgItem.page_image_url}"> \
                                        </div> \
                                        <div class="heading-title" data-title="${msgItem.page_title}">{{html helpers.convertMDtoHTML(msgItem.page_title, "bot")}}</div> \
                                        <div class="desc_text_info">{{html helpers.convertMDtoHTML(msgItem.page_preview, "bot")}}</div> \
                                    </div> \
                                {{/each}} \
                            </div> \
                        </div> \
                    </div> \
                </div> \
            </li>\
        {{/if}} \
        </script>';
        return searchTemplate;
    }
}

export default searchResultsTemplate;