export function gerarNumeros() {
  const unidades = {
    0: ["ноль", "nol'", "zero"],
    1: ["один", "odin", "um"],
    2: ["два", "dva", "dois"],
    3: ["три", "tri", "três"],
    4: ["четыре", "chetyre", "quatro"],
    5: ["пять", "pyat'", "cinco"],
    6: ["шесть", "shest'", "seis"],
    7: ["семь", "sem'", "sete"],
    8: ["восемь", "vosem'", "oito"],
    9: ["девять", "devyat'", "nove"]
  };

  const dezenasSimples = {
    10: ["десять", "desyat'", "dez"],
    11: ["одиннадцать", "odinnadtsat'", "onze"],
    12: ["двенадцать", "dvenadtsat'", "doze"],
    13: ["тринадцать", "trinadtsat'", "treze"],
    14: ["четырнадцать", "chetyrnadtsat'", "quatorze"],
    15: ["пятнадцать", "pyatnadtsat'", "quinze"],
    16: ["шестнадцать", "shestnadtsat'", "dezesseis"],
    17: ["семнадцать", "semnadtsat'", "dezessete"],
    18: ["восемнадцать", "vosemnadtsat'", "dezoito"],
    19: ["девятнадцать", "devyatnadtsat'", "dezenove"]
  };

  const dezenasPrefixo = {
    20: "двадцать",
    30: "тридцать",
    40: "сорок",
    50: "пятьдесят",
    60: "шестьдесят",
    70: "семьдесят",
    80: "восемьдесят",
    90: "девяносто"
  };

  const dezenasPrefixoTrans = {
    20: "dvadtsat'",
    30: "tridtsat'",
    40: "sorok",
    50: "pyat'desyat",
    60: "shest'desyat",
    70: "sem'desyat",
    80: "vosem'desyat",
    90: "devyanosto"
  };

  const dezenasExtensoPT = {
    20: "vinte",
    30: "trinta",
    40: "quarenta",
    50: "cinquenta",
    60: "sessenta",
    70: "setenta",
    80: "oitenta",
    90: "noventa"
  };

  const centenasPrefixo = {
    100: "сто",
    200: "двести",
    300: "триста",
    400: "четыреста",
    500: "пятьсот",
    600: "шестьсот",
    700: "семьсот",
    800: "восемьсот",
    900: "девятьсот"
  };

  const centenasPrefixoTrans = {
    100: "sto",
    200: "dvesti",
    300: "trista",
    400: "chetyresta",
    500: "pyatsot",
    600: "shestsot",
    700: "semsot",
    800: "vosemsot",
    900: "devyatsot"
  };

  const centenasExtensoPT = {
    100: "cem",
    200: "duzentos",
    300: "trezentos",
    400: "quatrocentos",
    500: "quinhentos",
    600: "seiscentos",
    700: "setecentos",
    800: "oitocentos",
    900: "novecentos"
  };

  const dados = {
    unidades: {
      "0–9": Object.entries(unidades).map(([n, [ext, trans, trad]]) => ({
        alg: parseInt(n),
        ext,
        trans,
        trad
      }))
    },
    dezenas: {
      "10–19": Object.entries(dezenasSimples).map(([n, [ext, trans, trad]]) => ({
        alg: parseInt(n),
        ext,
        trans,
        trad
      }))
    },
    centenas: {},
    milhar: {
      "1000+": [{
        alg: 1000,
        ext: "тысяча",
        trans: "tysyacha",
        trad: "mil"
      }]
    }
  };

  // Gerar dezenas compostas
  for (let d = 20; d <= 90; d += 10) {
    const intervalo = `${d}–${d + 9}`;
    dados.dezenas[intervalo] = [];
    for (let i = 0; i < 10; i++) {
      const alg = d + i;
      const unidade = unidades[i];
      const ext = i === 0 ? dezenasPrefixo[d] : `${dezenasPrefixo[d]} ${unidade[0]}`;
      const trans = i === 0 ? dezenasPrefixoTrans[d] : `${dezenasPrefixoTrans[d]} ${unidade[1]}`;
      const trad = i === 0 ? dezenasExtensoPT[d] : `${dezenasExtensoPT[d]} e ${unidade[2]}`;
      dados.dezenas[intervalo].push({ alg, ext, trans, trad });
    }
  }

  // Gerar centenas
  for (let c = 100; c <= 900; c += 100) {
    const intervalo = `${c}–${c + 99}`;
    dados.centenas[intervalo] = [];
    for (let i = 0; i < 100; i++) {
      const alg = c + i;
      const dez = Math.floor(i / 10) * 10;
      const uni = i % 10;

      const dezExt = dez === 0 ? "" : dezenasPrefixo[dez] || "";
      const dezTrans = dez === 0 ? "" : dezenasPrefixoTrans[dez] || "";
      const dezTrad = dez === 0 ? "" : dezenasExtensoPT[dez] || "";

      const uniExt = uni === 0 ? "" : unidades[uni][0];
      const uniTrans = uni === 0 ? "" : unidades[uni][1];
      const uniTrad = uni === 0 ? "" : unidades[uni][2];

      const ext = [centenasPrefixo[c], dezExt, uniExt].filter(Boolean).join(" ");
      const trans = [centenasPrefixoTrans[c], dezTrans, uniTrans].filter(Boolean).join(" ");

      let trad = "";
      if (i === 0) {
        trad = centenasExtensoPT[c];
      } else if (c === 100 && i > 0) {
        trad = `cento e ${dezTrad}${uni ? " e " + uniTrad : ""}`.replace(/ e $/, "");
      } else {
        trad = `${centenasExtensoPT[c]} e ${dezTrad}${uni ? " e " + uniTrad : ""}`.replace(/ e $/, "");
      }

      dados.centenas[intervalo].push({ alg, ext, trans, trad });
    }
  }

  return dados;
}
