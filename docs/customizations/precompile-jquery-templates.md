# Pre-compiling Custom jQuery Templates

From **v11.25.0**, the Web SDK no longer uses `new Function` (in the korejquery.js file) to compile jQuery templates. jQuery templates can therefore no longer be compiled in the browser at runtime via `$.tmpl()`. Any custom jQuery template must be **pre-compiled at build time**.

Below is the flow:

```
custom-templates.js                 script (Node)            custom-precompiled-templates.js
  [{ id, markup }, ...]      ──▶   generate-custom-templates  ──▶   { id: function(jQuery,$item){…} }
                                                                              │
                  chatWindowInstance.installCustomPrecompiledTemplates(templates) ◀──────┘
                                            │
                        Web SDK installs it via installPreCompiledTemplates
```

### Step 1 — List your templates in one file

Create `custom-templates.js` exporting an array of templates. Each entry has an `id` (which must match the `<script id="...">` in your template's `getTemplateString()`) and the template `markup`:

```js
module.exports = [
    {
        id: 'custom_weather_tmpl',
        markup: '<h2 data-cw-msg-id="${msgData.messageId}" data-time="${msgData.createdOnTimemillis}">Weather: ${msgData.message[0].component.payload.temparature}</h2>'
    },
    // { id: 'other_tmpl', markupFile: './templates/other.html' }
];
```

### Step 2 — Generate the pre-compiled file

The script compiles every template in your file and writes a single output file, `custom-precompiled-templates.js`.

- **Using the Web SDK via NPM / CDN URLs(script tag)** — Copy the script [`scripts/generate-custom-templates.js`](../../scripts/generate-custom-templates.js) into a local file, then run it:

  ```bash
  node generate-custom-templates.js
  ```

- **Using Web SDK source code** — the script is already included. Run it from the Web SDK root level:

  ```bash
  node scripts/generate-custom-templates.js
  ```

By default the script reads `./custom-templates.js` and writes `./custom-precompiled-templates.js`. To use different paths: `node <script> <inputFile> -o <outFile>`.

The output exports an object of pre compiled templates and also assigns it to `window.koreCustomPrecompiledTemplates` for CDN use. Re-run the script when a template changes.

### Step 3 — Install the templates on the chat window instance

Install the precompiled templates by calling `installCustomPrecompiledTemplates(...)` on the chat window instance with the generated object, **before the chat window renders** (i.e. before `show()`). The Web SDK installs them via `installPreCompiledTemplates` internally.

**NPM:**

```js
import customPrecompiledTemplates from './custom-precompiled-templates.js';

chatWindowInstance.installCustomPrecompiledTemplates(customPrecompiledTemplates);

chatWindowInstance.show();
```

**CDN URLs (script tag):**

```html
<script src="./custom-precompiled-templates.js"></script>
<script>
    chatWindowInstance.installCustomPrecompiledTemplates(window.koreCustomPrecompiledTemplates);

    chatWindowInstance.show();
</script>
```

No change is needed to your custom template's render code — once installed, `$(...).tmpl(data)` resolves `custom_weather_tmpl` from the pre-compiled file instead of compiling at runtime.

> [!NOTE]
> The `id` in the file must match the `<script id="...">` your `getTemplateString()` returns (and the name you pass to `.tmpl()`). The pre-compiled file is build output; re-run the script whenever you change a template.


### Example jQuery Template

a custom template json message:

```json
{
    "type": "bot_response",
    "from": "bot",
    "message": [
        {
            "type": "text",
            "component": {
                "type": "template",
                "payload": {
                    "template_type": "custom_weather_template",
                    "temparature": "36 C"
                }
            },
            "cInfo": {
                "body": ""
            }
        }
    ]
}
```

```js
class CustomWeatherTemplate {
    renderMessage(msgData) {
        const me = this;
        const $ = me.hostInstance.$;
        if (msgData?.message?.[0]?.component?.payload?.template_type === 'custom_weather_template') {
            return $(me.getTemplateString()).tmpl({ msgData: msgData });
        }
        return false;
    }
    getTemplateString() {
        return '<script id="custom_weather_tmpl" type="text/x-jquery-tmpl"> \
            <h2 data-cw-msg-id="${msgData.messageId}" data-time="${msgData.createdOnTimemillis}"> \
                Weather: ${msgData.message[0].component.payload.temparature} \
            </h2> \
        </script>';
    }
}

chatWindowInstance.templateManager.installTemplate(new CustomWeatherTemplate());
```
