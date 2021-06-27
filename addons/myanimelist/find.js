module.exports = class Find {
  constructor(needle, htmlToText, search, name, i) {
    this.needle = needle;
    this.htmlToText = htmlToText;
    this.search = new search(needle, name);
    this.name = name;
    this.i = isNaN(i) || typeof i !== 'number' ? 0 : i;
  }
  async go() {
    try {
      if (this.i < 0) this.i = 0;
      else if (this.i > 9) this.i = 9;
      let res = await this.search.go();
      if (res.success) {
        let nres = (await this.needle('get', res.urls[this.i])).body,
          anime = {
            success: true,
            name: res.names[this.i],
            index: this.i,
            miniposter: res.posters[this.i],
            type: res.types[this.i],
            episodes: res.episodes[this.i],
            score: res.scores[this.i],
          },
          body = nres
            .replace(/^([\S\s]*?)<div\sstyle="text-align\:\scenter\;">/gm, '')
            .replace(
              /<\/p><div\sstyle="margin-top\:\s15px\;"><div\sclass="floatRightHeader">([\S\s]*?)<\/html>/,
              ''
            )
            .replace(
              /<!\-\-\sMy\sList\s\-\->([\S\s]*?)<h2>Alternative\sTitles<\/h2>/gm,
              ''
            )
            .replace(
              /<\/div><\/td><td\svalign="top"([\S\s]*?)<\/div><p\sitemprop="description">/gm,
              ''
            )
            .replace(
              /<img\sclass="lazyload"\sdata\-src="(.*?)"/,
              (_, a) => (anime.poster = a)
            )
            .replace(
              /<span\sclass="dark_text">English\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.alternativeName = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Japanese\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.localName = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Synonyms\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) =>
                (anime.synonyms = a
                  .trim()
                  .split(', ')
                  .filter((e) => e.trim()))
            )
            .replace(
              /<span\sclass="dark_text">Status\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.status = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Aired\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.aired = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Broadcast\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.broadcast = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Premiered\:<\/span>([\S\s]*?)<a\shref(.*?)>([\S\s]*?)<\/a>/gm,
              (_, a, b, c) => (anime.premiered = c.trim())
            )
            .replace(
              /<span\sclass="dark_text">Producers\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => {
                let arr = [];
                a.replace(/<a\shref(.*?)>(.*?)<\/a>/gm, (__, b, c) =>
                  arr.push(c.trim())
                );
                anime.producers = arr;
              }
            )
            .replace(
              /<span\sclass="dark_text">Licensors\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => {
                let arr = [];
                a.replace(/<a\shref(.*?)>(.*?)<\/a>/gm, (__, b, c) =>
                  arr.push(c.trim())
                );
                anime.licensors = arr;
              }
            )
            .replace(
              /<span\sclass="dark_text">Studios\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => {
                let arr = [];
                a.replace(/<a\shref(.*?)>(.*?)<\/a>/gm, (__, b, c) =>
                  arr.push(c.trim())
                );
                anime.studios = arr;
              }
            )
            .replace(
              /<span\sclass="dark_text">Source\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.source = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Genres\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => {
                let arr = [];
                a.replace(/<a\shref(.*?)>(.*?)<\/a>/gm, (__, b, c) =>
                  arr.push(c.trim())
                );
                anime.genres = arr;
              }
            )
            .replace(
              /<span\sclass="dark_text">Duration\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.duration = a.replace('. per ep.', '').trim())
            )
            .replace(
              /<span\sclass="dark_text">Rating\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) =>
                (anime.rating = this.htmlToText(a.trim(), { wordwrap: false }))
            )
            .replace(
              /<span\sclass="dark_text">Ranked\:<\/span>([\S\s]*?)<sup>/gm,
              (_, a) => (anime.ranked = a.trim())
            )
            .replace(
              /<span\sclass="dark_text">Popularity\:<\/span>([\S\s]*?)<\/div>/gm,
              (_, a) => (anime.popularity = a.trim())
            );
        body += '__END';
        body.replace(
          /<span\sclass="dark_text">Favorites\:<\/span>([\S\s]*?)<\/div>([\S\s]*?)__END/gm,
          (_, a, b) =>
            (anime.synopsis = this.htmlToText(
              b
                .replace('[Written by MAL Rewrite]', '')
                .replace(/\n/gm, ' ')
                .trim(),
              { wordwrap: false }
            )
              .replace(/\n/gm, ' ')
              .trim())
        );
        return anime;
      } else {
        return { success: false };
      }
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
};
