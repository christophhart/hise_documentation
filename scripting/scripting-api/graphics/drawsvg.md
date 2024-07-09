
Draw a SVG to the panel. You first have to create a SVG object with [Content.createSVG("Base64String")](/scripting/scripting-api/content#createsvg) and then pass it to the drawSVG function. 
You can create the Base64 encoded SVG string with the [SVG to Path Converter](/working-with-hise/menu-reference/tools#show-svg-to-path-converter) that you can find under **Tools > Scripting Tools**.


```javascript
const var Panel1 = Content.getComponent("Panel1");

const var svg = Content.createSVG("552.nT6K8CFjCTOD.Xa2dUB7vwL.SvXp6TpBfQoF8BK9fB04advjZYtXueJWWylbAdFn2PtHYAvT.HE.5rS67tttXTRauwfO3CIDiu+uEnPhmjIRhwHzJhQF3KBCMfvDQ7t31dIDgESh.gDAfDfAG.yX3jEmynrvT6sGDhQgIS.mtvWqbE19fR+gS37cSa4dYTpb.jfkyJYy3PyjkcyHqiHkbkmw0xosaVsFbxVQosIEihh9Mv2rJRRobNsgevG537uF5+jOIbpRFgN6kaiccsXO3.R4Cmv1V2Nn01x+OFiaUWLMJ8Bwqzz3Oc91UV8SE5cH4u3PqUGWVebIyRsw48BhlN9rBwrz797idlkWt7DT4p2TTfSTz4L1vT586Bx6wT5los6KELGYsD9l0vxX2Hq2aZ2rpGVVYb..FbwsEgrDMmMuWo0KZZndSzCMpw+ZcoVcYs9Hc4C0.zG4SZc4IxoRn2A3j0CaSoU8met3T+XD9nfkG5I.iKsD8g7mm4CjWcfU+g57voNdPnfPf.C.YHCuCPQ..D.VbASWpJIv.zgSfoDP4fAkPqLUiDXB.n..V7tA3Hb.iq3e.SSDCbUQzX3KnvI9YcxM6fibJgmc42KQ3z.uEElWxrMVBU.J1gKFfMkE9fPWLPtyXTAFX.gIKvPCvjUfnO.FubCO.OzFZEtB9CDBDLLstdfvZ0LokAGD6UR.RFeMvXSxYionq.qoALngCSAwAtBX.Fo.");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawSVG(svg, this.getLocalBounds(0), 1);
});
```