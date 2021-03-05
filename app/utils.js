export function dateFormatter(date, tzd) {
  const tzn = new Date().getTimezoneOffset() * 60;
  let ret = (date + tzd + tzn) * 1000;
  return ret;
}

export function iconFormatter(weather) {
  const { id, icon } = weather;
  switch (id) {
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
      return "weather-lightning-rainy";

    case 210:
    case 211:
    case 212:
    case 221:
      return "weather-lightning";

    case 300:
    case 301:
    case 302:
      return "weather-partly-rainy";

    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      return "weather-rainy";

    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      return "weather-pouring";

    case 600:
    case 601:
    case 602:
      return "weather-snowy";

    case 611:
      return "weather-hail";

    case 612:
    case 615:
    case 620:
      return "weather-partly-snowy-rainy";

    case 613:
    case 616:
    case 621:
    case 622:
      return "weather-snowy-rainy";

    case 701:
    case 711:
    case 731:
    case 751:
    case 761:
    case 762:
    case 771:
      return "weather-windy";

    case 721:
      return "weather-hazy";

    case 741:
      return "weather-fog";

    case 781:
      return "weather-tornado";

    case 800:
      return icon[2] == "n" ? "weather-night" : "weather-sunny";

    case 801:
    case 802:
    case 803:
      return icon[2] == "n"
        ? "weather-night-partly-cloudy"
        : "weather-partly-cloudy";

    case 804:
      return "weather-cloudy";

    default:
      return "weather-cloudy-alert";
  }
}
