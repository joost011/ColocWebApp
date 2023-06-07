import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  public references: string[] = [
    'Võsa, U., Claringbould, A., (…), Franke, L.; 2021; Large-scale cis- and trans-eQTL analyses identify thousands of genetic loci and polygenic scores that regulate blood gene expression',
    'Giambartolomei C, al e (2014). “Bayesian Test for Colocalisation between Pairs of Genetic Association Studies Using Summary Statistics.” PLOS Genetics. https://doi.org/10.1371/journal.pgen.1004383.',
    'Wallace C (2020). “Eliciting priors and relaxing the single causal variant assumption in colocalisation analyses.” PLOS Genetics. https://doi.org/10.1371/journal.pgen.1008720.',
    'Wallace C (2021). “A more accurate method for colocalisation analysis allowing for multiple causal variants.” PLOS Genetics. https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1009440.',
    'Wang, G., Sarkar, A., Carbonetto, P. & Stephens, M. (2020). A simple new approach to variable selection in regression, with application to genetic fine mapping. Journal of the Royal Statistical Society, Series B 82, 1273–1300. https://doi.org/10.1111/rssb.12388',
    'Zou, Y., Carbonetto, P., Wang, G. & Stephens, M. (2021). Fine-mapping from summary data with the “Sum of Single Effects” model. bioRxiv https://doi.org/10.1101/2021.11.03.467167',
  ];

}
