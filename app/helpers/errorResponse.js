const getErrorBody = (msg, errors) => {
  if (msg === "00") {
    return {
      type: "https://problems-registry.smartbear.com/missing-body-property/",
      title: "Hace falta una propiedad requerida en el body",
      detail: `Al body de la solicitud le hace falta la propiedad ${errors[0].path}`,
      status: 400,
    };
  }
  if (msg === "01") {
    return {
      type: "https://problems-registry.smartbear.com/invalid-body-property-value/",
      title: "El valor de propiedad invalido",
      detail: `La solicitud contiene un valor invalido en la propiedad ${errors[0].path}`,
      status: 400,
    };
  }
  if (msg === "02") {
    return {
      type: "https://problems-registry.smartbear.com/missing-request-parameter/",
      title: "Hace falta un parametro en el query ",
      detail: `A la solicitud le hace falta el parametro ${errors[0].path}`,
      status: 400,
    };
  }

  if (msg === "03") {
    return {
      type: "https://problems-registry.smartbear.com/unauthorized/",
      title: "Sin autorización",
      detail: "A la solicitud le hace falta el token de autorización",
      status: 401,
    };
  }
  if (msg === "04") {
    return {
      type: "https://problems-registry.smartbear.com/forbidden/",
      title: "Prohibido",
      detail: "La solicitud, no se puede completar",
      status: 403,
    };
  }
  if (msg === "05") {
    return {
      type: "https://problems-registry.smartbear.com/unauthorized/",
      title: "Sin autorización",
      detail: "Las credenciales son incorrectas",
      status: 401,
    };
  }

  if (msg === "30") {
    return {
      type: "https://problems-registry.smartbear.com/service-unavailable/",
      title: "Servicio no disponible",
      detail: "En estos momentos el servicio no esta disponible",
      status: 503,
    };
  }
  return {
    type: "https://problems-registry.smartbear.com/server-error",
    title: "Server Error",
    detail: "El servidor encontro un error inexperado",
    status: 500,
  };
};

export default getErrorBody;
