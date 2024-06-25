<script setup>
  import Header from './components/Header.vue'
  import Relics from './components/Relics.vue'
  import Menu from './components/Menu.vue'
  import { ref } from 'vue'

  const worldstatefileurl = encodeURIComponent("worldstate");
  const solnodesdata = 'https://api.warframestat.us/solNodes/';

  const refreshTimeSeconds = 60;

  const currentTime = ref(new Date().toLocaleTimeString());
  setInterval(() => currentTime.value = new Date().toLocaleTimeString(), 1000);
  var worldstateTime = -1;
  var wfdata = {};
  var missionData = {};
  var solNodes;

  const refresh = async () => {

    let response = await fetch(worldstatefileurl);
    let data = await response.json().catch(console.error);

    wfdata = data;

    worldstateTime = new Date(data.Time*1000).toLocaleTimeString()

    missionData.capture = checkForFissure(data, "MT_CAPTURE");
    missionData.extermination = checkForFissure(data, "MT_EXTERMINATION");  
    missionData.disruption = checkForFissure(data, "MT_ARTIFACT");
    missionData.survival = checkForFissure(data, "MT_SURVIVAL");
    missionData.rescue = checkForFissure(data, "MT_RESCUE");
  }

  refresh();
  setInterval(refresh, refreshTimeSeconds*1000);

  function checkForFissure(data, missionType){
    let fissures = data.ActiveMissions;
    let output = "";
    
    fissures.forEach(mission => {
        if(mission.MissionType === missionType){
            let expirationTime = Number(mission.Expiry.$date.$numberLong);

            if(expirationTime > Date.now()){
                if(output === "") output = "FISSURE ACTIVE!";
                output += "\n\nrelic: " + mission.Modifier;
                output += "\nplanet: " + regionToPlanet(mission.Region);
                output += "\nsteelpath: " + (mission.Hard != null ? "yes" : "no");
                output += "\nfaction: " + nodeToFaction(mission.Node);
                output += "\nuntil: " + (new Date(Number(mission.Expiry.$date.$numberLong)).toLocaleTimeString());
            }
        }
    });

    if(output === "") output = "no fissure active";
    return output;
  }
  function nodeToFaction(node){
      if(solNodes === undefined) {
        console.log("no solnodes data!"); return "";
      }
      if(solNodes[node] === undefined) return "";
      return solNodes[node].enemy;
  }
  function regionToPlanet(region){
    switch(region){
        case 0: return "Unknown";
        case 1: return "Mercury";
        case 2: return "Venus";
        case 3: return "Earth";
        case 4: return "Mars";
        case 5: return "Jupiter";
        case 6: return "Saturn";
        case 7: return "Uranus";
        case 8: return "Neptune";
        case 9: return "Pluto";
        case 10: return "Ceres";
        case 11: return "Eris";
        case 12: return "Sedna";
        case 13: return "Europa";
        case 14: return "Clan Dojo";
        case 15: return "Void";
        case 16: return "Phobos";
        case 17: return "Deimos";
        case 18: return "Lua";
        case 19: return "Kuva Fortress";

    }
  }
  
</script>

<template>
  <header>
    <div class="wrapper">
      <Header title="QuickRelics" />
    </div>
  </header>

  <main>
    <Relics :currentTime :worldstateTime :wfdata :missionData/>
  </main>

  <menu>
    <Menu />
  </menu>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: top;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: block;
  }
}
</style>
