import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  MatSnackBar,
} from '@angular/material'
import {Router, NavigationError} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {AuthService} from '../core/auth.service';
import {ErrorMessageFormatterPipe} from '../shared/pipes/error-message-formatter.pipe';
import {ProjectsService} from './projects.service'
import {URLSearchParamsUtils} from "../shared/utils/url-search-params.utils";
import {ConfigLoaderService} from "../../environments/config-loader.service";
import {defaultTimeFrame} from "../shared/common";

@Component({
  selector: 'jm-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectsControl: FormControl;
  projectsObservable: Observable<void|any[]>;
  projects: any[];
  viewJobsEnabled = false;

  constructor(
    private readonly authService: AuthService,
    private readonly projectsService: ProjectsService,
    private readonly router: Router,
    private readonly viewContainer: ViewContainerRef,
    private errorBar: MatSnackBar,
    private configLoader:ConfigLoaderService) {}

  private validProject(projectId: string): boolean {
    if (this.projects) {
      for (let project of this.projects) {
        if (projectId == project.projectId) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnInit() {
    this.projectsControl = new FormControl();
    this.projectsControl.valueChanges
      .debounceTime(100)
      .subscribe(filter => this.updateProjects(filter));
    // Handle navigation errors raised in JobListResolver
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        this.handleError(event.error);
      }
    });
  }

  handleError(error: any) {
    this.errorBar.open(
      new ErrorMessageFormatterPipe().transform(error),
      'Dismiss',
      {
        viewContainerRef: this.viewContainer,
        duration: 3000,
      });
  }

  updateProjects(filter: string) {
    filter = filter ? filter + '*' : '.*';
    this.viewJobsEnabled = true;
    this.projectsObservable = Observable.fromPromise(
      this.projectsService.listProjects(filter)
        .then(listView => {
          // Sort projects alphabetically so that the shorter, matching project
          // shows up first.
          this.projects = (listView ? listView.results : []).sort();
          // If the currently entered string is a valid project ID, hide the
          // autocomplete menu so that the user can click the button
          this.viewJobsEnabled = this.validProject(this.projectsControl.value)
            || !listView.exhaustive;
          return !this.viewJobsEnabled || this.projects.length > 1 ?
            this.projects.map(project => project.projectId).sort() : [];
        })
        .catch(response => this.handleError(response))
    );
  }

  navigateJobs() {
    const extras = {
      queryParams:
        {
          q: URLSearchParamsUtils.encodeURLSearchParams({
            extensions: {
              projectId: this.projectsControl.value
            }})
        }
    };
    if (this.configLoader.getEnvironmentConfigSynchronous()['dashboardEnabled']) {
      this.router.navigate(['dashboard'], extras);
    } else {
      this.router.navigate(['jobs'], extras);
    }
  }
}
