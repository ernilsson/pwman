import { Component, OnInit } from '@angular/core';
import {CredentialModel} from "../../credential/credential.model";
import {CredentialService} from "../../shared/credential.service";

@Component({
  selector: 'app-filtered-credential-list',
  templateUrl: './filtered-credential-list.component.html',
  styleUrls: ['./filtered-credential-list.component.scss']
})
export class FilteredCredentialListComponent implements OnInit {
  credentials: CredentialModel[] = []
  filteredCredentials: CredentialModel[] = []
  filterQuery = ""

  constructor(private credentialService: CredentialService) { }

  ngOnInit(): void {
    this.credentials = this.credentialService.getCredentials()
    this.filteredCredentials = [...this.credentials]
    this.credentialService.getCredentialsSubject().subscribe(() => {
      this.credentials = this.credentialService.getCredentials()
      this.filterCredentialsByName()
    })
  }

  onFilterQueryChanged(filter: string) {
    this.filterQuery = filter
    this.filterCredentialsByName()
  }

  filterCredentialsByName() {
    this.filteredCredentials = this.credentials.filter(
      (credential: CredentialModel) => this.credentialNameContainsFilter(credential)
    )
  }

  credentialNameContainsFilter(credential: CredentialModel): boolean {
    const lowercaseName = credential.name.toLowerCase()
    const lowercaseFilterQuery = this.filterQuery.toLowerCase()
    return lowercaseName.includes(lowercaseFilterQuery)
  }
}
