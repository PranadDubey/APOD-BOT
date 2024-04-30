const axios = require("axios")
const { Telegraf } = require("telegraf")

const TOKEN = `6833614655:AAFR0Deovk-9uQlkqJCS0YCWlw8wSC6LWV4`
const bot = new Telegraf(TOKEN)
const url = "https://api.nasa.gov/planetary/apod?api_key=5nsth8aKBwQGegmc2Ch2zfjjeW1XClzfVTOGOdQA"

const fetchData = async () => {
  try {
    const res = await axios.get(url)
    return res.data // Returning the fetched data
  } catch (error) {
    console.error("Error fetching data:", error)
    return null // Return null if there's an error
  }
}

bot.start(async (ctx) => {
  // Asking for confirmation before showing the APOD
  ctx.reply("Would you like to receive the Astronomy Picture of the Day? (yes)")

  bot.hears(/yes/i, async (ctx) => {
    // Fetching data from NASA APOD API
    const data = await fetchData()

    if (data && data.title && data.explanation && data.url) {
      // Sending fetched data to the user in the desired order
      await ctx.reply(`[Image](${data.url})`)
      ctx.reply(`*${data.title}*\n\n${data.explanation}\n\n`)
    } else {
      ctx.reply("Sorry, couldn't fetch the Astronomical Picture of the Day.")
    }
  })
})

bot.launch()
