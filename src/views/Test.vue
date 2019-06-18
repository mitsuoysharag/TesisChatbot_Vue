<template>
  <v-content>
    <Cabecera/>
    <v-container grid-list-sm>
      <h2 class="text-xs-center mt-2 mb-4">Test de Estilo de Aprendizaje de Felder-Silverman</h2>

      <v-layout wrap>
        <v-flex xs12 md6 v-for="(pregunta_test, index) in preguntas_test" :key="index">
          <v-card elevation="0" height="100%" class="px-4 py-1">
            <v-radio-group v-model="pregunta_test.respuesta">
              <p class="mb-3">{{pregunta_test.pregunta}}</p>
              <v-radio
                v-for="(alternativa, index) in pregunta_test.alternativas"
                :key="alternativa"
                :label="alternativa"
                :value="[index]"
                height="10"
                color="primary"
              ></v-radio>
            </v-radio-group>
          </v-card>
        </v-flex>
      </v-layout>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <div class="text-xs-center mt-3">
            <v-btn color="primary" v-on="on">Enviar</v-btn>
          </div>
        </template>

        <v-card>
          <v-card-title class="headline" primary-title>Test de Aprendizaje</v-card-title>
          <v-card-text>¿Desea guardar los cambios?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">Cancelar</v-btn>
            <v-btn color="primary" flat @click="dialog = false; enviarPerfil()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import Cabecera from "../components/Cabecera";
import { log } from "util";
export default {
  data() {
    return {
      preguntas_test: [
        new PreguntasTest("Entiendo mejor algo:", [
          "Si lo practico",
          "Si pienso en ello"
        ]),
        new PreguntasTest("Me considero:", ["Realista", "Innovador"]),
        new PreguntasTest(
          "Cuando pienso acerca de lo que hice ayer, es más probable que lo haga sobre la base de:",
          ["Una imagen", "Palabras"]
        ),
        new PreguntasTest("Tengo tendencia a:", [
          "Entender los detalles de un tema pero no ver claramente su estructura completa",
          "Entender la estructura completa pero no ver claramente los detalles"
        ]),
        new PreguntasTest("Cuando estoy aprendiendo algo nuevo, me ayuda:", [
          "Hablar de ello",
          "Pensar en ello"
        ]),
        new PreguntasTest("Si yo fuera profesor, yo preferiría dar un curso:", [
          "Que trate sobre hechos y situaciones reales de la vida",
          "Que trate con ideas y teorías"
        ]),
        new PreguntasTest("Prefiero obtener información nueva de:", [
          "Imágenes, diagramas, gráficas o mapas",
          "Instrucciones escritas o información verbal"
        ]),
        new PreguntasTest("Una vez que entiendo:", [
          "Todas las partes, entiendo el total",
          "El total de algo, entiendo como encajan sus partes"
        ]),
        new PreguntasTest(
          "En un grupo de estudio que trabaja con un material difícil, es más probable que:",
          ["Participe y contribuya con ideas", "No participe y solo escuche"]
        ),
        new PreguntasTest("Es más fácil para mí:", [
          "aprender hechos",
          "aprender conceptos"
        ]),
        new PreguntasTest(
          "En un libro con muchas imágenes y gráficas es más probable que:",
          [
            "revise cuidadosamente las imágenes y las gráficas",
            "me concentre en el texto escrito"
          ]
        ),
        new PreguntasTest("Cuando resuelvo problemas de matemáticas:", [
          "generalmente trabajo sobre las soluciones con un paso a la vez",
          "frecuentemente sé cuales son las soluciones, pero luego tengo dificultad para imaginarme los pasos para llegar a ellas"
        ]),
        new PreguntasTest("En las clases a las que he asistido:", [
          "he llegado a saber como son muchos de los estudiantes",
          "raramente he llegado a saber como son muchos estudiantes"
        ]),
        new PreguntasTest("Cuando leo temas que no son de ficción, prefiero:", [
          "algo que me enseñe nuevos hechos o me diga como hacer algo",
          "algo que me dé nuevas ideas en que pensar"
        ]),
        new PreguntasTest("Me gustan los maestros:", [
          "que utilizan muchos esquemas en el pizarrón",
          "que toman mucho tiempo para explicar"
        ]),
        new PreguntasTest("Cuando estoy analizando un cuento o una novela:", [
          "pienso en los incidentes y trato de acomodarlos para configurar los temas",
          "me doy cuenta de cuales son los temas cuando termino de leer y luego tengo que regresar y encontrar los incidentes que los demuestran"
        ]),
        new PreguntasTest(
          "Cuando comienzo a resolver un problema de tarea, es más probable que:",
          [
            "comience a trabajar en su solución inmediatamente",
            "primero trate de entender completamente el problema"
          ]
        ),
        new PreguntasTest("Prefiero la idea de:", ["certeza", "teoría"]),
        new PreguntasTest("Recuerdo mejor:", ["lo que veo", "lo que oigo"]),
        new PreguntasTest("Es más importante para mí que un profesor:", [
          "exponga el material en pasos secuenciales claros",
          "me dé un panorama general y relacione el material con otros temas"
        ]),
        new PreguntasTest("Prefiero estudiar:", [
          "en un grupo de estudio",
          "solo"
        ]),
        new PreguntasTest("Me considero:", [
          "cuidadoso en los detalles de mi trabajo",
          "creativo en la forma en la que hago mi trabajo"
        ]),
        new PreguntasTest(
          "Cuando alguien me da direcciones de nuevos lugares, prefiero:",
          ["un mapa", "instrucciones escritas"]
        ),
        new PreguntasTest("Aprendo:", [
          "a un paso constante. Si estudio con ahínco consigo lo que deseo",
          "en inicios y pausas. Me llego a confundir y súbitamente lo entiendo"
        ]),
        new PreguntasTest("Prefiero primero:", [
          "hacer algo y ver que sucede",
          "pensar como voy a hacer algo"
        ]),
        new PreguntasTest(
          "Cuando leo por diversión, me gustan los escritores que:",
          [
            "dicen claramente los que desean dar a entender",
            "dicen las cosas en forma creativa e interesante"
          ]
        ),
        new PreguntasTest(
          "Cuando veo un esquema o bosquejo en clase, es más probable que recuerde:",
          ["la imagen", "lo que el profesor dijo acerca de ella"]
        ),
        new PreguntasTest("Cuando me enfrento a un cuerpo de información:", [
          "me concentro en los detalles y pierdo de vista el total de la misma",
          "trato de entender el todo antes de ir a los detalles"
        ]),
        new PreguntasTest("Recuerdo más fácilmente:", [
          "algo que he hecho",
          "algo en lo que he pensado mucho"
        ]),
        new PreguntasTest("Cuando tengo que hacer un trabajo, prefiero:", [
          "dominar una forma de hacerlo",
          "intentar nuevas formas de hacerlo."
        ]),
        new PreguntasTest("Cuando alguien me enseña datos, prefiero:", [
          "gráficas",
          "resúmenes con texto"
        ]),
        new PreguntasTest("Cuando escribo un trabajo, es más probable que:", [
          "lo haga (piense o escriba) desde el principio y avance",
          "lo haga (piense o escriba) en diferentes partes y luego las ordene"
        ]),
        new PreguntasTest(
          "Cuando tengo que trabajar en un proyecto de grupo, primero quiero:",
          [
            'realizar una "tormenta de ideas" donde cada uno contribuye con ideas',
            'realizar la "tormenta de ideas" en forma personal y luego juntarme con el grupo para comparar las ideas'
          ]
        ),
        new PreguntasTest("Considero que es mejor elogio llamar a alguien:", [
          "sensible",
          "imaginativo"
        ]),
        new PreguntasTest(
          "Cuando conozco gente en una fiesta, es más probable que recuerde:",
          ["cómo es su apariencia", "lo que dicen de sí mismos"]
        ),
        new PreguntasTest("Cuando estoy aprendiendo un tema, prefiero:", [
          "mantenerme concentrado en ese tema, aprendiendo lo más que pueda de él",
          "hacer conexiones entre ese tema y temas relacionados"
        ]),
        new PreguntasTest("Me considero:", ["abierto", "reservado"]),
        new PreguntasTest("Prefiero cursos que dan más importancia a:", [
          "material concreto (hechos, datos)",
          "material abstracto (conceptos, teorías)"
        ]),
        new PreguntasTest("Para divertirme, prefiero:", [
          "ver televisión",
          "leer un libro"
        ]),
        new PreguntasTest(
          "Algunos profesores inician sus clases haciendo un bosquejo de lo que enseñarán. Esos bosquejos son:",
          ["algo útiles para mí", "muy útiles para mí"]
        ),
        new PreguntasTest(
          "La idea de hacer una tarea en grupo con una sola calificación para todos:",
          ["me parece bien", "no me parece bien"]
        ),
        new PreguntasTest("Cuando hago grandes cálculos:", [
          "tiendo a repetir todos mis pasos y revisar cuidadosamente mi trabajo",
          "me cansa hacer su revisión y tengo que esforzarme para hacerlo"
        ]),
        new PreguntasTest("Tiendo a recordar lugares en los que he estado:", [
          "fácilmente y con bastante exactitud",
          "con dificultad y sin mucho detalle"
        ]),
        new PreguntasTest(
          "Cuando resuelvo problemas en grupo, es más probable que yo:",
          [
            "piense en los pasos para la solución de los problemas",
            "piense en las posibles consecuencias o aplicaciones de la solución en un amplio rango de campos"
          ]
        )
      ],
      dialog: false
    };
  },
  methods: {
    enviarPerfil() {
      let perfil = {
        codigo: this.$store.state.codigo_alumno,
        processing: {
          active: 0,
          reflexive: 0
        },
        perception: {
          sensitive: 0,
          intuitive: 0
        },
        input: {
          visual: 0,
          verbal: 0
        },
        understanding: {
          sequential: 0,
          _global: 0
        }
      };
      let respuestas = this.preguntas_test.forEach((pregunta_test, index) => {
        let res = pregunta_test.respuesta[0];
        let pos = index % 4;
        if (pos == 0)
          if (res == 0) perfil.processing.active += 1;
          else if (res == 1) perfil.processing.reflexive += 1;
        if (pos == 1)
          if (res == 0) perfil.perception.sensitive += 1;
          else if (res == 1) perfil.perception.intuitive += 1;
        if (pos == 2)
          if (res == 0) perfil.input.visual += 1;
          else if (res == 1) perfil.input.verbal += 1;
        if (pos == 3)
          if (res == 0) perfil.understanding.sequential += 1;
          else if (res == 1) perfil.understanding._global += 1;
      });
      this.$store.state.servicio.enviarPerfil(
        perfil,
        //onSuccess
        response => {
          console.log('Guardado');
          this.$router.push("cursos");
        },
        //onError
        error => {
          console.log(error);
        }
      );
    },
  },
  components: {
    Cabecera
  }
};

class PreguntasTest {
  constructor(pregunta, alternativas) {
    this.pregunta = pregunta;
    this.alternativas = alternativas;
    this.respuesta = "";
  }
}
</script>

<style scoped>
</style>
