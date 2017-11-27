var HomeMenuActionTypes = {
	MenuItemStart: 100,
	MenuItemSetting: 101,
	MenuItemHelp: 102
};

var EnemyTypes = {
	Enemy_Stone: 0,
	Enemy_1: 1,
	Enemy_2: 2,
	Enemy_Planet: 3
};

var EnemyName = {
	Enemy_Stone: 'gameplay.stone1.png',
	Enemy_1: 'gameplay.enemy-1.png',
	Enemy_2: 'gameplay.enemy-2.png',
	Enemy_Planet: 'gameplay.enemy.planet.png',
};

var SpriteVelocity = {
	Enemy_Stone: cc.p(0, -300),
	Enemy_1: cc.p(0, -80),
	Enemy_2: cc.p(0, -100),
	Enemy_Planet: cc.p(0, -50),
	Bullet: cc.p(0, 300)
};

var EnemyScores = {
	Enemy_Stone: 5,
	Enemy_1: 10,
	Enemy_2: 15,
	Enemy_Planet: 20
};

var SpriteIniticalHP = {
	Enemy_Stone: 3,
	Enemy_1: 5,
	Enemy_2: 15,
	Enemy_Planet: 20,
	Hero: 5
};

var CollisionType = {
	Enemy: 1,
	Hero: 1,
	Bullet: 1
};

var GameSceneNodeTag = {
	StatusBarFighterNode: 301,
	StatusBarLifeNode: 302,
	StatusBarScore: 303,
	BatchBackground: 800,
	Fighter: 900,
	ExplosionParticleSystem: 901,
	Bullet: 100,
	Enemy: 700
}

var EFFECT_KEY = 'sound_key';
var MUSIC_KEY = 'music_key';

var BOOL = {
	NO: '0',
	YES: '1'
};