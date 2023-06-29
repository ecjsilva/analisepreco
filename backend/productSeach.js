const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (url) => {
  const result = await axios.get(url);
  return result.data;
};

module.exports = {
  async index(req, res) {
    const url = await fetchData(
      `https://www.tupan.com.br/busca?s=${req.params.id}`
    );

    const $ = cheerio.load(url);
    let product = [];
    $(".products-list__item").each((i, e) => {
      const price = $(e).find(".product-card__new-price").text();
      const descripition = $(e).find(".product-card__name > a").text();
      const href = $(e).find(".product-card__name > a").attr("href");
      const img = $(e).find(".product-card__image > a > img").attr("src");
      const dados = { descripition, price, href, img };
      product.push(dados);
    });
    return res.send(product);
  },
};
