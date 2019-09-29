//Cookie Clicker script by Shylight with some modifications by Gouchnox
// Further tweaking by MakingBaconPancakes to fix icon
// Beta Icons File: http://orteil.dashnet.org/cookieclicker/beta/img/icons.png
// Release Icons File: http://orteil.dashnet.org/cookieclicker/img/icons.png

if (!("statsloaded" in window)) {
	
	var style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = `
	.diceIcon{
		padding-left: 18px;
		position: relative;
		cursor: pointer;
	}
	.diceIcon:before{
		content: '';
		background-image: url(img/icons.png?v=2.021);
		background-position: -276px 0px;
		background-size: 480px;
		width: 16px;
		height: 16px;
		display: block;
		position: absolute;
		left: 0;
		top: 0px;
	}
	b{
		opacity: 1!important;
		color: rgba(255,255,255,0.6);
	}`
	var diceIcon = '<span class="diceIcon"></span>'
	//class="diceIcon" onclick="Game.seed=Game.makeSeed()"
	
	document.getElementsByTagName('head')[0].appendChild(style)
	
    eval('Game.UpdateMenu=' + Game.UpdateMenu.toString().replace(/(str\+=.*Statistics)/,
        `with(Game){
            var spellOutcome     = '';
            if (isMinigameReady(Objects["Wizard tower"])){
                var spellsCast    = Objects["Wizard tower"].minigame.spellsCastTotal
                var target        = spellsCast + 10
                while(spellsCast < target){
                    Math.seedrandom(\`\${Game.seed}/\${spellsCast}\`)
                    spellOutcome += Math.random()<0.85?"<b><font color=#66ff66>S</font></b> ":"<b><font color=#ff6666>F</font></b> "
                    spellsCast+=1
                    Math.seedrandom()
                }
            }
        }
        $1`).replace(/(Game\.wrinklersPopped>0\?.*)/, 
        `$1
        \`<div class="listing"><b onclick="Game.seed=Game.makeSeed()" title="Reroll outcomes">\${diceIcon}</b> <b>Next spells <small>(success/backfire)</small> :</b> \${spellOutcome}</div>\`+` 
        )
    )
};

statsloaded = 1;