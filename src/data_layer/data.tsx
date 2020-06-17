import * as d3 from "d3"

export const ProcessList = () => {
	var parts = `Body Parts & Mirrors,Bumpers & Components,Fenders & Components,Grilles & Components,Hoods & Components,Mirrors & Components
Breakes Suspensions & Steering,Brake Discs  Pads & Calipers,Control Arms  Thrust Arms & Components,Lowering  Leveling & Lifting Kits,Shocks  Struts & Components,Wheel Hubs  Bearings  and Components
Engine & Drivetrain,Catalytic Converters & Components,Exhaust  Headers  Manifolds  Mufflers & Components,Fuel Systems & Components,Heating  Air Conditioning & Components,Radiators  Fans  Cooling Systems & Components
Exteriors & Accessories,Bumpers & Components,Car Covers,Fog Lights  Driving Lights  Components & Accessories,Grilles & Components,Hoods & Components,Switches  Relays  Wiring & Components
Headlight & Lighting,Fog Lights  Driving Lights  Components & Accessories,Headlights  Components & Accessories,Tail Lights  Back Up Lights & Accessories,Turn Signals  Side Markers & Other Lights
Interior Accessories,Carpet & Vinyl  Floor Kits,Dash & Dash Accessories,Floor Mats & Liners,Seats  Seat Covers & Accessories,Switches  Relays  Wiring & Components
Tools & Services,Code Readers  Scan Tools & Components,Garage Accessories,Mobile Electronics,Repair Manuals  Videos & Software,Tools
Misc`

	var arr = d3.csvParseRows(parts)
	return arr
}

export const Tags = () => {
	return new Promise<any>((res, rej) => {
		var arr = []
		arr = d3.csvParse(`front end, back end, bumper, mirrors, doors, front panel, back panel, spoilers, rims, body kit`)
		res(arr)
	})
}
