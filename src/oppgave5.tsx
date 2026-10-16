
import { useState } from "react"; // Lar appen lagre informasjon
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native"; // Importerer komponentene vi trenger

type WeatherInfo = { // Bestemmer hvordan værdata skal lagres
  city: string; // Navnet på byen som tekst
  temperature: number; // Temperaturen som tall
  description: string; // Værbeskrivelsen som tekst
};

export default function Oppgave5() { // Hovedfunksjonen til appen

  const [city, setCity] = useState(""); // Lagrer bynavnet
  const [weather, setWeather] = useState<WeatherInfo | null>(null); // Lagrer været
  const [loading, setLoading] = useState(false); // Sjekker om appen laster
  const [error, setError] = useState(""); // Lagrer feilmeldinger

  function getWeatherDescription(code: number) { // Gjør værkoder om til tekst
    if (code === 0) return "Sol ☀️"; // Kode 0 betyr klar himmel
    if (code <= 3) return "Skyet ⛅"; // Skyet vær
    if (code <= 48) return "Tåke 🌫️"; // Tåke
    if (code <= 57) return "Yr 🌧️"; // Yr
    if (code <= 67) return "Regn 🌧️"; // Regn
    if (code <= 77) return "Snø ❄️"; // Snø
    if (code <= 82) return "Regnbyger 🌦️"; // Regnbyger
    if (code <= 86) return "Snøbyger ❄️"; // Snøbyger
    if (code >= 95) return "Tordenvær ⛈️"; // Torden
    return "Ukjent vær"; // Hvis koden ikke gjenkjennes
  }

  async function getWeather() { // Funksjon som henter været fra internett

    if (city.trim() === "") { // Sjekker om bynavnet er tomt
      setError("Du må skrive inn en by!"); // Viser feilmelding
      return; // Stopper funksjonen
    }

    setLoading(true); // Starter lastingen
    setError(""); // Fjerner gamle feilmeldinger
    setWeather(null); // Fjerner tidligere værdata

    try { // Forsøker å hente informasjon

      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}&count=1`
      ); // Søker etter byen og koordinatene

      if (!locationResponse.ok) { // Sjekker om søket mislyktes
        throw new Error("Kunne ikke finne byen"); // Lager en feil
      }

      const locationData = await locationResponse.json(); // Leser svaret som JSON

      if (!locationData.results?.length) { // Sjekker om byen finnes
        setError("Fant ikke byen!"); // Viser feilmelding
        return; // Stopper søket
      }

      const location = locationData.results[0]; // Velger første søkeresultat

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code`
      ); // Henter værdata med koordinatene

      if (!weatherResponse.ok) { // Sjekker om værdata ble hentet
        throw new Error("Kunne ikke hente været"); // Lager en feil
      }

      const weatherData = await weatherResponse.json(); // Leser værdataene
      const current = weatherData.current; // Henter dagens aktuelle vær

      if (
        typeof current?.temperature_2m !== "number" ||
        typeof current?.weather_code !== "number"
      ) { // Sjekker at temperaturen og værkoden er tall
        throw new Error("Mangler værdata"); // Stopper ved ugyldig data
      }

      const temperature = current.temperature_2m; // Lagrer temperaturen
      const code = current.weather_code; // Lagrer værkoden

      setWeather({ // Oppdaterer værinformasjonen
        city: location.name, // Lagrer bynavnet
        temperature: temperature, // Lagrer temperaturen
        description: getWeatherDescription(code), // Lagrer værbeskrivelsen
      });

    } catch { // Kjøres dersom det oppstår feil
      setError("Kunne ikke hente været. Prøv igjen!"); // Viser feilmelding
    } finally { // Kjøres uansett om hentingen lykkes
      setLoading(false); // Stopper lastingen
    }
  }

  return ( // Bestemmer hva som vises på skjermen
    <View style={styles.container}> {/* Hovedbeholderen */}

      <Text style={styles.title}>🌤️ Vær-app</Text> {/* Overskrift */}

      <Text style={styles.label}>Skriv inn en by:</Text> {/* Hjelpetekst */}

      <TextInput
        style={styles.input}
        placeholder="F.eks. Oslo"
        value={city}
        onChangeText={setCity}
      /> {/* Skrivefelt som oppdaterer city */}

      <Pressable
        style={styles.button}
        onPress={getWeather}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Søk etter været</Text>
      </Pressable> {/* Knapp som starter værsøket */}

      {loading && ( // Vises når appen laster
        <ActivityIndicator
          size="large"
          color="#2196F3"
          style={{ marginTop: 20 }}
        />
      )}

      {error !== "" && ( // Vises hvis det finnes en feilmelding
        <Text style={styles.errorText}>{error}</Text>
      )}

      {weather !== null && ( // Viser været når dataene er hentet
        <View style={styles.weatherBox}>

          <Text style={styles.cityName}>
            {weather.city}
          </Text>

          <Text
            style={[
              styles.temperature,
              weather.temperature < 0
                ? styles.coldTemperature
                : null,
            ]}
          >
            {Math.round(weather.temperature)}°C
          </Text>

          <Text style={styles.description}>
            {weather.description}
          </Text>

        </View>
      )}

      <Text style={styles.source}>
        Værdata fra Open-Meteo
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({ // Lager designet til appen

  container: {
    flex: 1, // Fyller skjermen
    backgroundColor: "#E3F2FD", // Lyseblå bakgrunn
    justifyContent: "center", // Sentrerer loddrett
    alignItems: "center", // Sentrerer vannrett
    padding: 20, // Luft rundt innholdet
  },

  title: {
    fontSize: 30, // Stor overskrift
    fontWeight: "bold", // Fet skrift
    marginBottom: 30, // Avstand under overskriften
  },

  label: {
    fontSize: 18, // Tekststørrelse
    marginBottom: 10, // Avstand under teksten
  },

  input: {
    backgroundColor: "white", // Hvit bakgrunn
    borderWidth: 1, // Kanttykkelse
    borderColor: "gray", // Grå kant
    width: "100%", // Hele tilgjengelige bredden
    padding: 12, // Luft inni feltet
    borderRadius: 8, // Runde hjørner
    marginBottom: 20, // Avstand under feltet
  },

  button: {
    backgroundColor: "#2196F3", // Blå knapp
    padding: 15, // Luft inni knappen
    borderRadius: 8, // Runde hjørner
    alignItems: "center", // Sentrerer knappeteksten
  },

  buttonText: {
    color: "white", // Hvit tekst
    fontSize: 16, // Tekststørrelse
    fontWeight: "bold", // Fet skrift
  },

  weatherBox: {
    backgroundColor: "white", // Hvit værboks
    padding: 25, // Luft inni boksen
    borderRadius: 15, // Runde hjørner
    marginTop: 30, // Avstand over boksen
    width: "100%", // Full bredde
    alignItems: "center", // Sentrerer innholdet
  },

  cityName: {
    fontSize: 24, // Størrelse på bynavnet
    fontWeight: "bold", // Fet skrift
  },

  temperature: {
    fontSize: 45, // Stor temperatur
    fontWeight: "bold", // Fet skrift
    color: "#2196F3", // Blå temperatur
    marginVertical: 15, // Avstand over og under
  },

  coldTemperature: {
    color: "red", // Rød temperatur under 0
  },

  description: {
    fontSize: 18, // Størrelse på værbeskrivelsen
  },

  errorText: {
    color: "red", // Rød feilmelding
    fontSize: 16, // Tekststørrelse
    marginTop: 20, // Avstand over feilmeldingen
  },

  source: {
    fontSize: 12, // Liten skrift
    color: "gray", // Grå tekst
    marginTop: 30, // Avstand over kildeteksten
  },
});
