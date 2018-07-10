
var Telegraf = require('telegraf')
var getUrls = require('get-urls')
const urlM = require('url');

var bot = new Telegraf('612812596:AAEWDeBxhg1XPiy_SYct9fok_37Jy2NG3K0')

var HELLO = `Hello, just send (or forward) me any message and I'll try to find`+
` file links there and reply to you with download links. Note: download links `+
`are valid for limited time only; to get a new link, resend the message.`

bot.start((ctx) => ctx.reply(HELLO))
bot.help((ctx) => ctx.reply(HELLO))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))
//bot.hears('v', onVideoNote)

// (async (function onVideoNote (ctx) {
//     var fileId = ctx.message.video_note.file_id;
//     var fileLink = await ctx.telegram.getFileLink(fileId);
//     ctx.reply(fileLink);
// }))();
bot.on('message', (ctx) => {
    var urls = getUrls(ctx.message.text)
    urls.forEach(url => ctx.reply(getDriveID(new URL(url))));
  })

//  bot.telegram.getFileLink("BQADBAADOAADp44ZUS-ufIzfC0sPAg")
//         .then((link) => {
//             console.log(link)
//         })

var getDriveID = function(myURL){
    paths = myURL.pathname.split('/')
    if(paths.length > 0)
    {
        if(paths[0] == 'open')
        {
            var id = myURL.searchParams.get('id')
            if(id) return id
        }
        paths.forEach((v,i) => {if(v == 'd') {return(paths[i+1])}})
    }
    return ''
}
const downloadPhotoMiddleware = (ctx, next) => {
    return bot.telegram.getFileLink(ctx.message.photo[0])
        .then((link) => {
        ctx.state.fileLink = link
        return next()
        })
    }
    
bot.on('photo', downloadPhotoMiddleware, (ctx, next) => {
    console.log('Photo url:', ctx.state.fileLink)
    return ctx.reply(ctx.state.fileLink)
})

const downloadVideoMiddleware = (ctx, next) => {
    if (ctx.message.document.file_size > 19000000){
        return 'file is too big';
    }
    else{
    return ctx.telegram.getFileLink(ctx.message.document.file_id)
        .then((link) => {
        ctx.state.fileLink = link
        return next()
        })
    }
}
    
bot.on('document', downloadVideoMiddleware, (ctx, next) => {
console.log('video url:', ctx.state.fileLink)
return ctx.reply(ctx.state.fileLink)
})

function onVideoNote (ctx) {
//   var fileId = ctx.message.video_note.file_id;
//   var fileLink = ctx.telegram.getFileLink(fileId);
//   ctx.reply(fileLink);
}

bot.startPolling()