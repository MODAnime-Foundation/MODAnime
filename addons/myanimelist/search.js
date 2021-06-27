module.exports = class Search {
  constructor(needle, name) {
    this.needle = needle;
    this.name = name;
  }
  async go() {
    try {
      let get = (
          await this.needle(
            'get',
            `https://myanimelist.net/search/all?q=${this.name
              .replace(/([\s]+)/gm, '+')
              .toLowerCase()
              .trim()}&cat=all`
          )
        ).body,
        anime = {
          success: true,
          names: [],
          urls: [],
          posters: [],
          types: [],
          episodes: [],
          scores: [],
        };
      get
        .replace(/^([\S\s]*?)<h2\sid="anime">Anime<\/h2>/, '')
        .replace(
          RegExp(
            `Search\\sfor\\s"${this.name
              .toLowerCase()
              .replace(/\s/gm, '\\s')}"\\sin\\sAnime([\\S\\s]*?)<\\/html>`
          ),
          ''
        )
        .replace(/<a\shref="(.*?)"\sclass="hoverinfo_trigger"/gm, (_, a) =>
          anime.urls.push(a)
        )
        .replace(
          /<img\sclass="lazyload"\sdata\-src="(.*?)"\s(.*?)alt="(.*?)"/gm,
          (_, a, b, c) => {
            anime.posters.push(a);
            anime.names.push(c);
          }
        )
        .replace(
          /<div\sclass="pt8\sfs10\slh14\sfn\-grey4">([\S\s]*?)<a\shref="(.*?)">(.*?)<\/a>(.*?)\((.*?)\)([\S\s]*?)Scored(.*?)<br>/gm,
          (_, a, b, c, d, e, f, g) => {
            anime.types.push(c.trim());
            anime.episodes.push(Number(e.replace('eps', '').trim()));
            anime.scores.push(Number(g.trim()));
          }
        );
      return anime;
    } catch (e) {
      return { success: false };
    }
  }
};
