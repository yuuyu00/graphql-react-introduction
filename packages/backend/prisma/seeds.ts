import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction(async (tx) => {
    const users = await Promise.all(
      [
        {
          name: "葦名弦一郎",
          email: "genichiro@example.com",
        },
        {
          name: "葦名一心",
          email: "isshin@example.com",
        },
        {
          name: "半兵衛",
          email: "hanbee@example.com",
        },
      ].map(async (user) =>
        prisma.user.create({
          data: { ...user },
        })
      )
    );

    const categories = await Promise.all(
      [
        {
          name: "日常のこと",
        },
        {
          name: "戦のこと",
        },

        {
          name: "主君のこと",
        },
      ].map((category) => prisma.category.create({ data: category }))
    );

    const articles = [
      {
        title: "朝霞に映ゆる刃光",
        content:
          "朝霞に映ゆる刻、我が刃を磨き上げん。庭にて稽古するは日課なり。心を鍛え上げ、身を動かすことで、戦の備えを整えん。",
        userId: users[0].id,
      },

      {
        title: "戦の夜明けに立ち向かう心持",
        content:
          "戦場の空気は冷たく、身を包む緊張あり。命を賭けた戦い、武士の運命なり。恐怖と希望が交錯する中、勝利を目指し、刃を振るわん。",
        userId: users[0].id,
      },

      {
        title: "主君への忠誠心",
        content:
          "主君への忠誠は、我が命よりも重し。主君のためにどう奉仕できるか夜長に思いを馳せる。主君の威光を天下に轟かせんと、日々励む。",
        userId: users[0].id,
      },

      {
        title: "静寂の茶室で心を澄ます",
        content:
          "戦なき時、茶の湯にて心を落ち着かせん。静けさが心の安らぎをもたらし、戦への心構えを整えん。精神を養うべし。",
        userId: users[1].id,
      },

      {
        title: "忠義のために戦う覚悟",
        content:
          "戦は我が運命にあり、主君への忠義を示す場なり。勝利のため、身を削りて戦う。家族と領土を守り、主君の栄光のために。",
        userId: users[1].id,
      },

      {
        title: "主君と共に過ごすひと時",
        content:
          "主君と共に過ごす時、心に深き慰めをもたらす。主君の思索に触れ、戦への心構えを新たにする。主君の御心に応えんと精進する。",
        userId: users[1].id,
      },

      {
        title: "農と武の調和を求めて",
        content:
          "日々の農作業と武士としての訓練、両立させん。農は生活を支え、訓練は身を守る。調和が生きる道なり。",
        userId: users[2].id,
      },

      {
        title: "勝利への執念深く",
        content:
          "戦場での一刻が生死を分かつ。敵に対する恐怖よりも、勝利への意志を持つべし。この執念が生き抜く力なり。",
        userId: users[2].id,
      },

      {
        title: "主君への絶対的なる信頼",
        content:
          "主君への信頼は、岩の如し。主君の命令に、命を懸ける覚悟あり。主君の大義に生き、栄光のために戦い抜く決意を新たにする。",
        userId: users[2].id,
      },
    ];

    await Promise.all(
      articles.map((article, index) =>
        prisma.article.create({
          data: {
            ...article,
            categories: {
              connect: {
                id: (index % 3) + 1,
              },
            },
          },
        })
      )
    );
  });
}

main().finally(() => prisma.$disconnect());
