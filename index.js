import express from 'express';
import axios from 'axios';
import cors from 'cors'
import dotenv from 'dotenv'

console.log(dotenv.config().parsed.TOKEN);

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(cors());
const TOKEN = dotenv.config().parsed.TOKEN;
// const ACCESS_TOKEN = "444901bb84e6dfdaa3";
// const VK_API_VERSION = '5.131'; // Версия VK API
// const GROUP_ID = 'howorld'; // Идентификатор группы ВКонтакте

app.get("/", (req, res) => {
  res.send('<h1>Здарова</h1>')
});


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`)
});

app.get("/getSubscribersTG", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${TOKEN}/getChatMembersCount`,
      {
        params: {
          chat_id: "@TheHolyWorld",
        },
      }
    );

    const subscribersCount = response.data.result;
    res.json({ subscribersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscribers count" });
  }
});

// app.get("/getSubscribersVK", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.vk.com/method/groups.getById",
//       {
//         params: {
//           access_token:
//             "6c398c356c398c356c398c35aa6f2f920166c396c398c350907df77245b8e79d144f98b",
//           group_id: "205337728",
//           fields: "members_count",
//           v: "5.154",
//         },
//       }
//     );

//     console.log(
//       "------------------------------------------------------------------"
//     );
//     console.log(response);
//     console.log(
//       "------------------------------------------------------------------"
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.log(
//       "------------------------------------------------------------------"
//     );
//     console.log(error);
//     console.log(
//       "------------------------------------------------------------------"
//     );
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const API_KEY_YOUTUBE = dotenv.config().parsed.API_KEY_YOUTUBE;
const CHANNEL_ID = dotenv.config().parsed.CHANNEL_ID;

app.get("/getSubscribersYouTube", async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: "statistics",
          id: CHANNEL_ID,
          key: API_KEY_YOUTUBE,
        },
      }
    );

    const subscribersCount = response.data.items[0].statistics.subscriberCount;

    res.json({ subscribersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscribers count" });
  }
});

export default app