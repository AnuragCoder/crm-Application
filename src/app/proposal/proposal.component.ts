import { Component, OnInit, ViewChild } from '@angular/core';
import { PropasalService } from '../_service/proposal/propasal.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProposalComponent implements OnInit {
  addProposaltemp : boolean = false;

  // columnsToDisplay = ['Customer', 'PackageList', 'PackageType', 'Status' , 'Date'];
  columnsToDisplay = ['Customer', 'PackageType', 'PackageList', 'Status' , 'Date'];
  dataSource: MatTableDataSource<any>;
  expandedElement: any;

  constructor(public rest : PropasalService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.getProposal();

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getProposal(){
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('currentUser');
    this.rest.getProposal(token).subscribe(result => {
       console.log(result)
       if(result['status'] == 1){
         console.log(result['value']);
          this.dataSource = new MatTableDataSource(result['value']);
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

      });
  }

  addProposal() {
    this.addProposaltemp = !this.addProposaltemp;


   }

}
