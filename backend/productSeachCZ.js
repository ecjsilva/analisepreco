const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (url) => {
  const result = await axios.get(url);
  return result.data;
};

module.exports = {
  async index(req, res) {
    const url = await fetchData(
      `https://www.cazanovaconstrucao.com.br/loja/busca.php?loja=767420&palavra_busca=${req.params.id}`
    );

    const $ = cheerio.load(url);
    let product = [];
    $(".product").each((i, e) => {
      const href = $(e).find(".area-image > a").attr("href");
      const pricem = parseFloat($(e).find(".caracteristica-metro").val());
      const pricep = parseFloat($(e).find(".valor-caixa").val());
      const price = $(e).find(".after-featured").text();
      const pricepiso = pricep / pricem;

      const priceValue =
        pricepiso == pricepiso
          ? pricepiso.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
          : price;

      const descripition = $(e).find(".name").text();
      const img = $(e).find(".product .image img").attr("data-src");
      const dados = {
        descripition,
        href,
        img,
        price,
        priceValue,
      };
      product.push(dados);
    });
    return res.send(product);
  },
};
