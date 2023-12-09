function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages:[],
    };
  },
  watch: {
    playerHealth(value) { 
        if (value <=0 && this.monsterHealth <=0) {
          // draw
          this.winner = 'draw'
      }
      else if (value <=0) {
        // player lost
          this.winner = 'monster'
      }
    },
    monsterHealth(value) { 
      if (value <=0 && this.playerHealth <=0) {
        // draw
        this.winner = 'draw'

    }
    else if (value <=0) {
      // monster lost
          this.winner = 'player'
    }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
      return { width: "0%" };
        
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
          
        }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackDamage = getRandomValue(15, 5);
      this.monsterHealth -= attackDamage;
      this.addLogMessage('player','attack', attackDamage);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandomValue(20, 10);
      this.playerHealth -= attackDamage;
      this.addLogMessage('monster','attack', attackDamage);

    },
    specialAttackMonster() {
      this.currentRound++;
      const attackDamage = getRandomValue(25, 15);
      this.monsterHealth -= attackDamage;
      this.addLogMessage('player','specialAttack', attackDamage);
      this.attackPlayer();
      

    },
    healPLayer() {
      this.currentRound++;
      const healPoints = getRandomValue(20, 15);
      if (this.playerHealth + healPoints > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healPoints;        
      }
      this.addLogMessage('player','heal', healPoints);
      this.attackPlayer();
    },
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(player,action,value) {
      this.logMessages.push({
        actionBy: player,
        actionType: action,
        actionValue: value
      }); // unshitf() add elements at top of array
    },
  },
});
app.mount("#game");
