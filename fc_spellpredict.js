// ==UserScript==
// @name         Cookie Clicker Predict Spell +10 Reordered
// @namespace    http://tampermonkey.net/
// @version      0.1.2.1
// @author       Random Reddit Guy +me +others
// @match        http://orteil.dashnet.org/cookieclicker/
// @source       https://www.reddit.com/r/CookieClicker/comments/6v2lz3/predict_next_hands_of_faith/
// @grant        none
// ==/UserScript==

(function() {
    if(Game.ObjectsById[7].minigameLoaded){
        var lookup = setInterval(function() {
            if (typeof Game.ready !== 'undefined' && Game.ready) {
                var CastSpell = document.getElementById("grimoireSpell1");
                CastSpell.onmouseover = function(){
                    Game.tooltip.dynamic=1;
                    Game.tooltip.draw(this, Game.ObjectsById[7].minigame.spellTooltip(1)()
                                      + '<div class="line"></div><div class="description">'
                                  + '<b>1st Spell:</b> ' + nextSpell(0) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>8th Spell:</b> ' + nextSpell(7) + '<br />'
                                  + '<b>2nd Spell:</b> ' + nextSpell(1) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>9th Spell:</b> ' + nextSpell(8) + '<br />'
                                  + '<b>3rd Spell:</b> ' + nextSpell(2) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>10th Spell:</b> ' + nextSpell(9) + '<br />'
                                  + '<b>4th Spell:</b> ' + nextSpell(3) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>11th Spell:</b> ' + nextSpell(10) + '<br />'
                                  + '<b>5th Spell:</b> ' + nextSpell(4) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>12th Spell:</b> ' + nextSpell(11) + '<br />'
                                  + '<b>6th Spell:</b> ' + nextSpell(5) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>13th Spell:</b> ' + nextSpell(12) + '<br />'
                                  + '<b>7th Spell:</b> ' + nextSpell(6) + '<b> -- </b>' + '<b>  </b>'
                                  + '<b>14th Spell:</b> ' + nextSpell(13) +'</div>','this');
                    Game.tooltip.wobble();};
                clearInterval(lookup);
            }
        }, 1000);
    }
})();

nextSpell = function(i) {
    season=Game.season;
    var obj = obj || {};
    M = Game.ObjectsById[7].minigame;
    spell = M.spellsById[1];
    var failChance = M.getFailChance(spell);
    if (typeof obj.failChanceSet !== 'undefined') failChance = obj.failChanceSet;
    if (typeof obj.failChanceAdd !== 'undefined') failChance += obj.failChanceAdd;
    if (typeof obj.failChanceMult !== 'undefined') failChance *= obj.failChanceMult;
    if (typeof obj.failChanceMax !== 'undefined') failChance = Math.max(failChance, obj.failChanceMax);
    Math.seedrandom(Game.seed + '/' + (M.spellsCastTotal + i));
    var choices = [];
    if (!spell.fail || Math.random() < (1 - failChance)) {
        Math.random();Math.random();
        if (Game.season=='valentines' || Game.season=='easter'){Math.random();}
        choices.push('<b style="color:#FFE060">Frenzy', '<b style="color:#80C0FF">Lucky');
        if (!Game.hasBuff('Dragonflight')) choices.push('<b style="color:#00FF40">Click Frenzy');
        if (Math.random() < 0.1) choices.push('<b style="color:#80C0FF">Cookie Chain', '<b style="color:#FF80FF">Cookie Storm', 'Blab');
        if (Game.BuildingsOwned >= 10 && Math.random() < 0.25) choices.push('<b style="color:#FFA000">Building Special');
        if (Math.random() < 0.15) choices = ['Cookie Storm (Drop)'];
        if (Math.random() < 0.0001) choices.push('<b style="color:#5FFFFC">Sugar Lump');
    } else {
        Math.random();Math.random();
        if (Game.season=='valentines' || Game.season=='easter'){Math.random();}
        choices.push('<b style="color:#FF3605">Clot', '<b style="color:#FF3605">Ruin Cookies');
        if (Math.random() < 0.1) choices.push('<b style="color:#DAA520">Cursed Finger', '<b style="color:#DAA520">Elder Frenzy');
        if (Math.random() < 0.003) choices.push('<b style="color:#5FFFFC">Sugar Lump');
        if (Math.random() < 0.1) choices = ['Blab'];
    }
    ret = choose(choices);
    Math.seedrandom();
    return '<small>' + ret + '</b></small>';
}