/***	@filename	Travincal.js*	@author		kolton*	@desc		kill Counncil members in Travincal*/function Travincal() {	var i, orgX, orgY, coords;	this.buildList = function (checkColl) {		var monsterList = [],			monster = getUnit(1);		if (monster) {			do {				if ([345, 346, 347].indexOf(monster.classid) > -1 && Attack.checkMonster(monster) && (!checkColl || !checkCollision(me, monster, 0x1))) {					monsterList.push(copyUnit(monster));				}			} while (monster.getNext());		}		return monsterList;	}	Town.doChores();	Pather.useWaypoint(83);	Precast.doPrecast(true);	orgX = me.x;	orgY = me.y;		if (Config.Travincal.PortalLeech) {		Pather.moveTo(orgX + 85, orgY - 139);		Attack.clear(10); 		Pather.moveTo(orgX + 85, orgY - 139);		Pather.makePortal();		delay(1000);		Precast.doPrecast(true);	}	if (me.getSkill(143, 0) && !me.getSkill(54, 0) && !me.getStat(97, 54)) {		coords = [60, -53, 64, -72, 78, -72, 74, -88];		for (i = 0; i < coords.length; i += 2) {			if (i % 4 === 0) {				Pather.moveTo(orgX + coords[i], orgY + coords[i + 1]);			} else {				Skill.cast(143, 0, orgX + coords[i], orgY + coords[i + 1]);				Attack.clearList(this.buildList(1));			}		}		Attack.clearList(this.buildList(0));	} else {		Pather.moveTo(orgX + 101, orgY - 56);		if (me.classid === 4 && !me.getSkill(54, 1) && me.gametype === 1) {			Pather.moveToExit([100, 83], true);		}		Attack.clearList(this.buildList(0));	}	return true;}