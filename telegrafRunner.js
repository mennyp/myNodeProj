var Telegraf = require('telegraf')
var bot = new Telegraf('612812596:AAEWDeBxhg1XPiy_SYct9fok_37Jy2NG3K0')
//bot.Telegraf.sendMessage(481095885, "menny toLocaleString")
bot.on('message', (ctx) => {
    // // resend existing file by file_id
     //ctx.replyWithDocument({source: '/home/menny/Downloads/chunklist_b5564000.m3u8'}).then(console.log('yes'))
    //ctx.replyWithHTML('<b>Launch through Intent scheme.</b>')
    // // send file
    // ctx.replyWithVideo({ source: '/path/to/video.mp4' })
  
    // // send stream
    // ctx.replyWithVideo({
    //   source: fs.createReadStream('/path/to/video.mp4')
    // })
  
    // // send buffer
    // ctx.replyWithVoice({
    //   source: Buffer.alloc()
    // })
  
    // // send url via Telegram server
    // ctx.replyWithPhoto('https://picsum.photos/200/300/')
  
    // pipe url content
    // ctx.replyWithPhoto({
    //   url: 'https://picsum.photos/200/300/?random',
    //   filename: 'some.jpg'
    // })
  })

  bot.startPolling()