export const rolesPath = [
  {
    path: "/",
    role: ["CLIENT"],
  },
  {
    path: "/vehicles",
    role: ["CLIENT"],
  },
  {
    path: "/about",
    role: ["CLIENT"],
  },
  {
    path: "/reservation",
    role: ["CLIENT"],
  },
  {
    path: "/reservation/form",
    role: ["CLIENT"],
  },
  {
    path: "/admin/home",
    role: ["ADMIN"],
  },
  {
    path: "/admin/user",
    role: ["ADMIN"],
  },
  {
    path: "/admin/user/data",
    role: ["ADMIN"],
  },
  {
    path: "/admin/vehicle",
    role: ["ADMIN"],
  },
  {
    path: "/admin/vehicle/data",
    role: ["ADMIN"],
  },
  {
    path: "/admin/reservation",
    role: ["ADMIN"],
  },
  {
    path: "/admin/reservation/data",
    role: ["ADMIN"],
  },
];

export function validateCpf(rule, value) {
  try {
    if (!value) return Promise.resolve();

    let cpfInput = value;
    let cpfNumber = cpfInput.replace(/\D/g, "");

    if (cpfNumber.length != 11) return Promise.reject("CPF inválido");

    if (cpfNumber !== "") {
      let validate = /^[0-9]{11}$/;
      if (validate.test(cpfNumber)) {
        if (
          cpfNumber === "00000000000" ||
          cpfNumber === "11111111111" ||
          cpfNumber === "22222222222" ||
          cpfNumber === "33333333333" ||
          cpfNumber === "44444444444" ||
          cpfNumber === "55555555555" ||
          cpfNumber === "66666666666" ||
          cpfNumber === "77777777777" ||
          cpfNumber === "88888888888" ||
          cpfNumber === "99999999999"
        )
          return Promise.reject("CPF inválido");
        let sum;
        let rest;
        sum = 0;

        for (let i = 0; i <= 9; i++) {
          sum = sum + cpfNumber.substring(i - 1, i) * (11 - i);
        }
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
          rest = 0;
        }
        if (rest !== parseInt(cpfNumber.substring(9, 10))) {
          return Promise.reject("CPF inválido");
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum = sum + cpfNumber.substring(i - 1, i) * (12 - i);
        }
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11) {
          rest = 0;
        }
        if (rest !== parseInt(cpfNumber.substring(10, 11))) {
          return Promise.reject("CPF inválido");
        }
      }
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}
