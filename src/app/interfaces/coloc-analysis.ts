export interface ColocAnalysis {
    uuid: string,
    extension: string,
    finished: boolean,
    status_list: ColocAnalysisStatus[],
}

export interface ColocAnalysisStatus {
    coloc_analysis: string,
    id: number,
    status_message: string,
    status_order: number,
}