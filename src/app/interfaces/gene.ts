export interface Gene {
    coloc: number[],
    eqtls: {
        Gene: string[],
        MAF: number[],
        N: number[],
        SNPPos: number[],
        logp: number[],
        pvalues: number[],
        snp: string[],
        type: string,
    },
    meta_data: {
        chromosome: number,
        gene_name: string,
        gene_id?: string,
        start_position: number,
        stop_position: number,
        total_eqtl_snps: number,
        total_gwas_snps: number,
        total_intersecting_snps: number,
        top_snp: string,
    },
    posterior: {
        'PP.H0.abf': number,
        'PP.H1.abf': number,
        'PP.H2.abf': number,
        'PP.H3.abf': number,
        'PP.H4.abf': number,
        nsnps: number,
    }
}
