import React, { Component } from 'react'
import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, ViewsDirective, ViewDirective, ExcelExport, Print } from '@syncfusion/ej2-react-schedule';
import swal from 'sweetalert';




export class ScheduleComponent1 extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      data: [],
      res: [],
      serverData: [],
      redirect: null
    }
    this.onExportDataClick.bind(this);
    //this.onEventRendered.bind(this);
    
    //this.handleChange.bind(this);
  }

  //handleChange = this.handleChange.bind(this);
  
  

  onActionBegin(args) {
    if (args.requestType === 'toolbarItemRendering') {

      let exportIt = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
        text: ' Save', cssClass: 'e-excel-export', click: this.saveTab.bind(this),
      };
      let exportItem = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
        text: 'Print', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
      };
      let deletbtn = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
        text: 'Delete', cssClass: 'e-excel-export', click: this.onDelete.bind(this)
      };

      args.items.push(exportIt);
      args.items.push(deletbtn);

      
      

    }
  }



  change(args) {
    this.scheduleObj.selectedDate = args.value;
    this.scheduleObj.dataBind();
    //console.log("data changing ");
    
  }


  onDragStart(args) {
    args.navigation.enable = true;
  }


  onExportClick() {
    let exportValues = {
      fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location', 'Description']
    };
    this.scheduleObj.print(exportValues)
    console.log(this.scheduleObj.eventsData)



  }

  saveTab(){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
          
        });
        this.onExportDataClick()
        //window.location.href = "http://localhost:3000/teacher";
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  sawlCheck(){
    swal("Are you sure you want to do this?", {
      buttons: ["Oh noez!",true ],
    });
  }
  
  
  onExportDataClick(){
    //console.log(this.state.data, 'Onexportdata')
    fetch('https://gitscheduleapp.herokuapp.com/api/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("saved", this.state.data)
        // this.setState({serverData: responseJson.data}, ()=>{console.log("server data: ", this.state.serverData)})
        // return responseJson.data;
      })
      .catch((error) => {
        console.error(error);
      })

      
      
      this.props.handleTabChange('two', this.state.data);
  }

  onDelete() {

    window.location.reload();
    

  }

  render() {
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent height='650px' cssClass='excel-export' width='100%'
            id='schedule' ref={schedule => this.scheduleObj = schedule}
            selectedDate={new Date()} showWeekNumber={true} eventSettings={{ dataSource: this.state.data }}
            actionBegin={this.onActionBegin.bind(this)} dragStart={(this.onDragStart.bind(this))}
      


          >
            <ViewsDirective>
              <ViewDirective option='Day' startHour='09:00' endHour='19:00' />
              <ViewDirective option='Week' startHour='09:00' endHour='19:00' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, Print]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>

      </div>
    </div>);
  }

}

export default ScheduleComponent1