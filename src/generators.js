import NextGenerator from "./generators/NextGenerator";
import NuxtGenerator from "./generators/NuxtGenerator";
import ReactGenerator from "./generators/ReactGenerator";
import ReactNativeGenerator from "./generators/ReactNativeGenerator";
import ReactTypescriptGenerator from "./generators/ReactTypescriptGenerator";
import TypescriptInterfaceGenerator from "./generators/TypescriptInterfaceGenerator";
import VueGenerator from "./generators/VueGenerator";
import VuetifyGenerator from "./generators/VuetifyGenerator";
import QuasarGenerator from "./generators/QuasarGenerator";

function wrap(cl) {
  return ({ hydraPrefix, templateDirectory }) =>
    new cl({ hydraPrefix, templateDirectory });
}

export default function generators(generator = "react") {
  switch (generator) {
    case "next":
      return wrap(NextGenerator);
    case "nuxt":
      return wrap(NuxtGenerator);
    case "react":
      return wrap(ReactGenerator);
    case "react-native":
      return wrap(ReactNativeGenerator);
    case "typescript":
      return wrap(TypescriptInterfaceGenerator);
    case "react-typescript":
      return wrap(ReactTypescriptGenerator);
    case "vue":
      return wrap(VueGenerator);
    case "vuetify":
      return wrap(VuetifyGenerator);
    case "quasar":
      return wrap(QuasarGenerator);
  }
}
