import { Gene } from "./gene";

export interface Result {
    genes: Gene[],
    total_colocalizing_genes: number,
    total_eqtl_snps: number,
    total_gwas_snps: number,
    total_tested_genes: number,
}
