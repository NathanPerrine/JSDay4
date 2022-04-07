// console.log('This is the F1 js file')

{
    //Grab Form
    let form = document.getElementById('f1Form');
    console.log(form)

    // Function that handles the Submit Event from the form
    async function handleSubmit(e){
        // Stops the form from refreshing the page
        e.preventDefault();

        // Check if table has data
        var table = document.getElementById('standingsTable'); 
        var tablerowcount = table.rows.length;
        
        // If table has data (length > 1) remove that data
        // -1 so the table head doesn't get removed
        if (tablerowcount > 1){
            for (let i = 0; i < tablerowcount -1; i++){
                table.deleteRow(-1)
            };
        };

        // Get year
        let f1Year = e.target.year.value
        // Get season
        let f1Season = e.target.season.value
        console.log(f1Year, f1Season)
        //Get F1 Info
        let f1 = await getF1Info(f1Year, f1Season)
        console.log(f1)
        for (let i = 0; i < f1.length; i++){
            buildRow(f1[i])
        };
    }

    async function getF1Info(year, season){
        try{
            let res = await fetch(`http://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
            let data = await res.json()
            return data['MRData']['StandingsTable']['StandingsLists']['0']['DriverStandings']
        } catch(e){
            console.error(e)
        }
    }

    async function buildRow(info){
        // console.log(info['Driver']['givenName'])
        // Table body to insert into
        const tbody = document.getElementById('f1Body')
        // Table Row
        const row = document.createElement('tr')

        // Position
        let position = info['position']
        const th = document.createElement('th')
        th.scope = "row"
        th.innerHTML = position
        row.append(th)

        // Driver name
        let driver = info['Driver']['givenName']
        const driverTD = document.createElement('td')
        driverTD.innerHTML = driver
        row.append(driverTD)

        // Points
        let points = info['points']
        const pointsTD = document.createElement('td')
        pointsTD.innerHTML = points
        row.append(pointsTD)

        // Nationality
        let nation = info['Driver']['nationality']
        const nationTD = document.createElement('td')
        nationTD.innerHTML = nation
        row.append(nationTD)

        // Constructor
        let constructor = info['Constructors'][0]['constructorId']
        let constID = document.createElement('td')
        constID.innerHTML = constructor
        row.append(constID)

        // console.log(driver, position, points, nation, constructor)
        // Add row to table body
        tbody.append(row)

    }



    form.addEventListener('submit', handleSubmit);
}