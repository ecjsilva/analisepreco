const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (url) => {
  const result = await axios.get(url);
  return result.data;
};

module.exports = {
  async index(req, res) {
    const url = await fetchData(
      `https://venezaconstrucao.com.br/catalogsearch/result/?q=${req.params.id}`
    );

    const $ = cheerio.load(url);
    let product = [];
    $(".product-item").each((i, e) => {
      const price = $(e).find(".price").text();
      const specialprice = $(e)
        .find(".special-price > .price")
        .prop("innerText");
      const descripition = $(e).find(".product-name > a").text();
      const href = $(e).find(".product-item-top > a ").attr("href");
      const img = $(e).find(".main-img").attr("src");
      const dados = { descripition, price, specialprice, href, img };
      product.push(dados);
    });
    return res.send(product);
  },
};
