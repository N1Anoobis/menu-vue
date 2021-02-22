<template>
  <body>
    <header>
      <h1>
        Artificial intelligence
      </h1>
    </header>
    <div id="game">
      <section id="monster" class="container">
        <h2>AI Health</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="monsterBarStyles"></div>
        </div>
      </section>
      <section id="player" class="container">
        <h2>Human Health</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="playerBarStyles"></div>
        </div>
      </section>
      <section class="container" v-if="winner">
        <h2>Game Over</h2>
        <h3 v-if="winner === 'monster'">AI Lost</h3>
        <h3 v-if="winner === 'player'">Human Won</h3>
        <h3 v-if="winner === 'draw'">Draw</h3>
        <button @click="startNewGame">Start New Game</button>
      </section>
      <section id="controls" v-else>
        <button @click="attackMonster">ATTACK</button>
        <button :disabled="mayUseSpecialAttack" @click="specialAttack">
          SPECIAL ATTACK
        </button>
        <button :disabled="mayHeal" @click="healPlayer">HEAL</button>
        <button @click="surrender">SURRENDER</button>
      </section>
      <section id="log" class="container">
        <h2>Battle Log</h2>
        <ul>
          <li
            v-for="(logMessage, idx) in logMessages"
            :key="logMessage.actionBy + idx"
          >
            <span :class="setClass(logMessage.actionBy)">{{
              logMessage.actionBy === "player" ? "Human" : "AI"
            }}</span>
            <span v-if="logMessage.actionType === 'heal'">
              heals himself for
              <span class="log--heal">{{ logMessage.actionValue }}</span></span
            >
            <span v-else>
              attack damaged by
              <span class="log--damage">{{
                logMessage.actionValue
              }}</span></span
            >
          </li>
        </ul>
      </section>
    </div>
  </body>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "navbar",
})
export default class NavBar extends Vue {
  private playerHealth = 100;
  private monsterHealth = 100;
  private currentRound = 1;
  private winner: null | string = null;
  private logMessages: unknown[] = [];

  get monsterBarStyles(): object {
    if (this.monsterHealth < 0) {
      return { width: "0%" };
    }
    return { width: this.monsterHealth + "%" };
  }

  get playerBarStyles(): object {
    if (this.playerHealth < 0) {
      return { width: "0%" };
    }
    return { width: this.playerHealth + "%" };
  }

  get mayUseSpecialAttack(): boolean {
    return this.currentRound % 3 !== 0;
  }

  get mayHeal(): boolean {
    return this.currentRound % 7 !== 0;
  }

  randomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  attackMonster(): void {
    this.currentRound++;
    const attackValue = this.randomValue(12, 5);
    this.monsterHealth -= attackValue;
    this.addLogMessage("player", "attack", attackValue);
    this.attackPlayer();
  }

  attackPlayer(): void {
    const attackValue = this.randomValue(15, 8);
    this.playerHealth -= attackValue;
    this.addLogMessage("monster", "attack", attackValue);
  }

  specialAttack(): void {
    this.currentRound++;
    const attackValue = this.randomValue(10, 25);
    this.monsterHealth -= attackValue;
    this.addLogMessage("player", "special-attack", attackValue);
    this.attackPlayer();
  }

  healPlayer(): void {
    if (this.currentRound === 0) {
      return;
    }
    this.currentRound++;
    const healValue = this.randomValue(15, 20);
    this.playerHealth += healValue;
    this.addLogMessage("player", "heal", healValue);
    this.attackPlayer();
  }

  startNewGame(): void {
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.winner = null;
    this.currentRound = 1;
    this.logMessages = [];
  }

  surrender(): void {
    this.winner = "monster";
  }

  addLogMessage(side: string, action: string, value: number) {
    this.logMessages.unshift({
      actionBy: side,
      actionType: action,
      actionValue: value,
    });
  }

  setClass(message: string): object {
    return {
      "log--player": message === "player",
      "log--monster": message === "monster",
    };
  }

  @Watch("playerHealth")
  playerLose(value: number) {
    if (value <= 0 && this.monsterHealth <= 0) {
      this.winner = "draw";
    } else if (value <= 0) {
      this.winner = "monster";
    }
  }

  @Watch("monsterHealth")
  monsterLose(value: number) {
    if (value <= 0 && this.playerHealth <= 0) {
      this.winner = "draw";
    } else if (value <= 0) {
      this.winner = "player";
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>
