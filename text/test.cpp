#include "sleepy_discord/sleepy_discord.h"

class MyClientClass : public SleepyDiscord::DiscordClient {
public:
  using SleepyDiscord::DiscordClient::DiscordClient;
  void onMessage(SleepyDiscord::Message message) override {
    if(messgae.startsWith("whcg hello")){
      sendMessage(message.channelID,"Hello "+message.author.username);
    }
  }
}

int main(){
  myClientClass client("token",SleepyDiscord::USER_CONTROLLED_THREADS);
}
