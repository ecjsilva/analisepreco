const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (url) => {
  const result = await axios.get(url);
  return result.data;
};

async function index(req, res) {
  const url = await fetchData(
    `https://venezaconstrucao.com.br/catalogsearch/result/?q=elizabeth`
  );

  const $ = cheerio.load(url);
  let product = [];
  $(".product-item").each((i, e) => {
    const price = $(e).find(" .price").text();
    const descripition = $(e).find(".product-name > a").text();
    const dados = { descripition, price };
    product.push(dados);
  });
  console.log(product);
}

module.exports = {
  async index(req, res) {
    const url = await fetchData(
      `https://www.cazanovaconstrucao.com.br/loja/busca.php?loja=767420&palavra_busca=${req.params.id}`
    );

    function dividir(preco, caixa) {
      const precot = parseFloat(preco);
      const caixam = parseFloat(caixa);

      const result = precot / caixam;
      return result;
    }

    const $ = cheerio.load(url);
    let product = [];
    $(".product").each((i, e) => {
      const href = $(e).find(".area-image > a").attr("href");
      const caixam = $(e).find("span").text();
      const pricet = $(e).find(".after-featured").text();
      const descripition = $(e).find(".name").text();

      const dados = { descripition, caixam, pricet, href };
      product.push(dados);
    });
    return res.send(product);
  },
};
